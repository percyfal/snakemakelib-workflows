#! /bin/bash
#
# Copyright (C) 2016 by Per Unneberg
#
# Description: automate build and deployment
# 

# Script directory
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
# Variables
RECIPE_DIR=$DIR/../conda.recipe
CONDAMETA=$RECIPE_DIR/meta.yaml


# a simple help
if [ "$1" == "-h" ]; then
    usage="$(basename "$0") [-h] -- program to trigger the deployment of releases and devel pkgs
    where:
        -h     show this help text
        -r     new release tag in the form X.X.X or X.X-(alpha|beta).X
        -d     devel build tag in the form X.X.X[dev]number, e.g. 0.1.0dev1 or X.X-(alpha|beta).X[dev]number, e.g. 0.1-alpha.1dev1
    "
    echo "$usage"
    exit 0
fi

# option management
while getopts r:d: option
do
    case "${option}" in
        r) release=${OPTARG};;
	d) devel=${OPTARG};;
    esac 
done

# release tags
release_short=$( echo $release | sed 's|\([^\^.]*\)\(\^0\)$|\1|g' | sed 's/-alpha/a/g' | sed 's/-beta/b/g' )

# main
if [[ -z "$devel" && ! -z "$release" ]]; then
    echo "You have triggered the release process"

    # create a new branch
    git checkout -b release_$release

    # Add version tag
    git tag -a $release -m "Version $release"

    # CHANGELOG generation
    gitchangelog > $DIR/../ChangeLog
    ret=$?
    if [ ! -e $DIR/../sphinx/source/docs/releases/$release.rst ]; then ret=0; fi;
    if [ ! `grep $release $DIR/../sphinx/source/docs/release_notes.rst` ]; then ret=0; fi;
    if [ $ret -ne 0 ]; then
        echo "Exiting because ChangeLog generation failed."
        echo "Check you actually have a $DIR/../sphinx/source/docs/releases/<tag>/.rst file."
        echo "And you actually updated $DIR/../sphinx/source/docs/release_notes.rst with the latest releases/<tag>."
        exit 1
    fi
    git add $DIR/../ChangeLog
    git commit -m "Updating ChangeLog."

    # conda version number updates
    # Get latest release for conda
    sed -i "s/version:.*/version: \"$release_short\"/g" $CONDAMETA
    sed -i "s/git_rev:.*/git_rev: \"$release\"/g" $CONDAMETA
    git add $CONDAMETA
    echo "Wrote $CONDAMETA"
    git commit -m "Updating conda version to $release."

    # Merge branch into master and push to origin
    git checkout master
    git pull origin
    git merge --no-ff release_$release -m "Merge branch release_$release"
    git push origin master
    git branch -d release_$release

    git tag -a $release -f
    git push origin $release

    git checkout develop
    git merge master

elif [[ ! -z "$devel" && -z "$release" ]]; then
    echo "You have triggered the devel build process"

    # Check the tag
    taglist=`git tag --list --sort=version:refname`
    tagarray=($taglist)
    lasttag=${tagarray[-1]}
    if [[ "$lasttag" == "$devel" ]]; then
	echo "The latest tag detected is $lasttag and you are trying to use the same tag, please bump your dev/rc tag."
        exit 1
    fi

    # tag it locally
    git tag -a $devel -m "New devel[rc] build $devel."

    # and push the tag
    git push origin $devel
    echo "The new devel build was triggered."

else
    echo "You have to pass a -d tag (dev build) OR -r tag for release."
    echo "Run ./deploy.sh -h to get some more help with the args to pass."
    exit 0
fi
