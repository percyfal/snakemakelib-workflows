document.addEventListener("DOMContentLoaded", function(event) {
    
    (function(global) {
      function now() {
        return new Date();
      }
    
      var force = "";
    
      if (typeof (window._bokeh_onload_callbacks) === "undefined" || force !== "") {
        window._bokeh_onload_callbacks = [];
        window._bokeh_is_loading = undefined;
      }
    
    
      
      
    
      function run_callbacks() {
        window._bokeh_onload_callbacks.forEach(function(callback) { callback() });
        delete window._bokeh_onload_callbacks
        console.info("Bokeh: all callbacks have finished");
      }
    
      function load_libs(js_urls, callback) {
        window._bokeh_onload_callbacks.push(callback);
        if (window._bokeh_is_loading > 0) {
          console.log("Bokeh: BokehJS is being loaded, scheduling callback at", now());
          return null;
        }
        if (js_urls == null || js_urls.length === 0) {
          run_callbacks();
          return null;
        }
        console.log("Bokeh: BokehJS not loaded, scheduling load and callback at", now());
        window._bokeh_is_loading = js_urls.length;
        for (var i = 0; i < js_urls.length; i++) {
          var url = js_urls[i];
          var s = document.createElement('script');
          s.src = url;
          s.async = false;
          s.onreadystatechange = s.onload = function() {
            window._bokeh_is_loading--;
            if (window._bokeh_is_loading === 0) {
              console.log("Bokeh: all BokehJS libraries loaded");
              run_callbacks()
            }
          };
          s.onerror = function() {
            console.warn("failed to load library " + url);
          };
          console.log("Bokeh: injecting script tag for BokehJS library: ", url);
          document.getElementsByTagName("head")[0].appendChild(s);
        }
      };var element = document.getElementById("73b46e06-52d6-4592-84f0-6270775204cc");
      if (element == null) {
        console.log("Bokeh: ERROR: autoload.js configured with elementid '73b46e06-52d6-4592-84f0-6270775204cc' but no matching script tag was found. ")
        return false;
      }
    
      var js_urls = ['https://cdn.pydata.org/bokeh/release/bokeh-0.12.3.min.js', 'https://cdn.pydata.org/bokeh/release/bokeh-widgets-0.12.3.min.js'];
    
      var inline_js = [
        function(Bokeh) {
          Bokeh.set_log_level("info");
        },
        
        function(Bokeh) {
          Bokeh.$(function() {
              Bokeh.safely(function() {
                  var docs_json = {"9ef29b2e-5da5-4a62-afb0-7abb66eaeacd":{"roots":{"references":[{"attributes":{"callback":null},"id":"0a550961-81c3-4739-8bcf-116f1c44edd8","type":"DataRange1d"},{"attributes":{"callback":null,"plot":{"id":"9cdc6597-0e59-4b87-8e34-3bef36c776b5","subtype":"Figure","type":"Plot"},"tooltips":[["Sample","@SM"],["Chromosome","@chr"]]},"id":"eaf53358-1dae-42ca-9fa4-4bd19000500a","type":"HoverTool"},{"attributes":{"plot":null,"text":null},"id":"e808c88e-2538-40f7-8276-6632506550af","type":"Title"},{"attributes":{},"id":"9e35a544-e38d-48cc-933c-77c32372ed02","type":"ToolEvents"},{"attributes":{"plot":{"id":"9cdc6597-0e59-4b87-8e34-3bef36c776b5","subtype":"Figure","type":"Plot"}},"id":"b819dac9-5040-411e-a768-a1034c50fd60","type":"ResetTool"},{"attributes":{"overlay":{"id":"705f9271-9b87-4486-bfde-071817ddf119","type":"BoxAnnotation"},"plot":{"id":"9cdc6597-0e59-4b87-8e34-3bef36c776b5","subtype":"Figure","type":"Plot"}},"id":"1d264fa7-483b-4345-8edf-5f4836b04b97","type":"BoxZoomTool"},{"attributes":{"plot":{"id":"9cdc6597-0e59-4b87-8e34-3bef36c776b5","subtype":"Figure","type":"Plot"}},"id":"7f8ebdd2-587b-4e2b-9af0-87d92b1977ca","type":"ResizeTool"},{"attributes":{"callback":null,"overlay":{"id":"3ab49e4a-f795-4381-94b3-efc3e850dc5a","type":"BoxAnnotation"},"plot":{"id":"9cdc6597-0e59-4b87-8e34-3bef36c776b5","subtype":"Figure","type":"Plot"},"renderers":[{"id":"03d2690e-979b-43fb-9358-825f9095552b","type":"GlyphRenderer"}]},"id":"de33fb84-9dc5-4988-a3ab-d8bbb0e4f793","type":"BoxSelectTool"},{"attributes":{},"id":"4c883086-833e-4e5f-bacf-f09e11af9063","type":"BasicTickFormatter"},{"attributes":{"plot":{"id":"9cdc6597-0e59-4b87-8e34-3bef36c776b5","subtype":"Figure","type":"Plot"}},"id":"fc799d9c-462f-4d90-876d-604ff7042703","type":"WheelZoomTool"},{"attributes":{"plot":{"id":"9cdc6597-0e59-4b87-8e34-3bef36c776b5","subtype":"Figure","type":"Plot"},"ticker":{"id":"9fd304fe-034c-4c17-ad83-fc9fd434453d","type":"BasicTicker"}},"id":"6a1fc1a3-5de0-4475-ac20-1ad25d1dc381","type":"Grid"},{"attributes":{"callback":null},"id":"af140d7f-7733-41ba-a2b9-3991fc25462d","type":"DataRange1d"},{"attributes":{"fill_alpha":{"value":0.1},"fill_color":{"value":"#1f77b4"},"line_alpha":{"value":0.1},"line_color":{"value":"#1f77b4"},"size":{"units":"screen","value":6},"x":{"field":"chrlen_percent"},"y":{"field":"mapped_bases_percent"}},"id":"1b0694d1-73fa-4062-8ba3-26afb1c59b53","type":"Circle"},{"attributes":{},"id":"9fd304fe-034c-4c17-ad83-fc9fd434453d","type":"BasicTicker"},{"attributes":{},"id":"bd73dd54-be79-4416-a4c1-a5f43990ada6","type":"BasicTickFormatter"},{"attributes":{"data_source":{"id":"4023e8eb-4ee2-4e19-86f1-0b499b8efc4d","type":"ColumnDataSource"},"glyph":{"id":"de67b4c6-d06d-4593-bcd3-a91b9959e8e6","type":"Circle"},"hover_glyph":null,"nonselection_glyph":{"id":"1b0694d1-73fa-4062-8ba3-26afb1c59b53","type":"Circle"},"selection_glyph":null},"id":"03d2690e-979b-43fb-9358-825f9095552b","type":"GlyphRenderer"},{"attributes":{"callback":null,"column_names":["mapped_bases_percent","sd","chrlen","SM","chr","index","chrlen_percent","mapped_bases","mean_coverage"],"data":{"SM":["S1","S1","S2","S2"],"chr":["chr1","chr2","chr1","chr2"],"chrlen":[4000000.0,1000000.0,4000000.0,1000000.0],"chrlen_percent":[80,20,80,20],"index":[0,1,2,3],"mapped_bases":[8000000.0,12000000.0,12000000.0,8000000.0],"mapped_bases_percent":[40,60,60,40],"mean_coverage":[2,12,3,8],"sd":[5,20,5,20]}},"id":"4023e8eb-4ee2-4e19-86f1-0b499b8efc4d","type":"ColumnDataSource"},{"attributes":{},"id":"f8140b1f-d6c5-47fd-894f-c0a8e0c0d46f","type":"BasicTicker"},{"attributes":{"active_drag":"auto","active_scroll":"auto","active_tap":"auto","tools":[{"id":"0372b9e9-bdca-40e3-b1cf-17d54c4b8a8f","type":"PanTool"},{"id":"fc799d9c-462f-4d90-876d-604ff7042703","type":"WheelZoomTool"},{"id":"1d264fa7-483b-4345-8edf-5f4836b04b97","type":"BoxZoomTool"},{"id":"de33fb84-9dc5-4988-a3ab-d8bbb0e4f793","type":"BoxSelectTool"},{"id":"b819dac9-5040-411e-a768-a1034c50fd60","type":"ResetTool"},{"id":"33f9b08f-b47b-431f-9ff4-22afa4771bcd","type":"SaveTool"},{"id":"eaf53358-1dae-42ca-9fa4-4bd19000500a","type":"HoverTool"},{"id":"7f8ebdd2-587b-4e2b-9af0-87d92b1977ca","type":"ResizeTool"}]},"id":"45d46c6a-4def-4b98-9220-75109ea6a0ba","type":"Toolbar"},{"attributes":{"plot":{"id":"9cdc6597-0e59-4b87-8e34-3bef36c776b5","subtype":"Figure","type":"Plot"}},"id":"33f9b08f-b47b-431f-9ff4-22afa4771bcd","type":"SaveTool"},{"attributes":{"fill_alpha":{"value":0.9},"fill_color":{"field":"SM"},"line_alpha":{"value":0.9},"line_color":{"field":"SM"},"size":{"units":"screen","value":6},"x":{"field":"chrlen_percent"},"y":{"field":"mapped_bases_percent"}},"id":"de67b4c6-d06d-4593-bcd3-a91b9959e8e6","type":"Circle"},{"attributes":{"axis_label":"mapped reads (% of total)","formatter":{"id":"bd73dd54-be79-4416-a4c1-a5f43990ada6","type":"BasicTickFormatter"},"plot":{"id":"9cdc6597-0e59-4b87-8e34-3bef36c776b5","subtype":"Figure","type":"Plot"},"ticker":{"id":"f8140b1f-d6c5-47fd-894f-c0a8e0c0d46f","type":"BasicTicker"}},"id":"c007cb3a-783b-4dff-a21e-8ee56944d22b","type":"LinearAxis"},{"attributes":{"bottom_units":"screen","fill_alpha":{"value":0.5},"fill_color":{"value":"lightgrey"},"left_units":"screen","level":"overlay","line_alpha":{"value":1.0},"line_color":{"value":"black"},"line_dash":[4,4],"line_width":{"value":2},"plot":null,"render_mode":"css","right_units":"screen","top_units":"screen"},"id":"705f9271-9b87-4486-bfde-071817ddf119","type":"BoxAnnotation"},{"attributes":{"bottom_units":"screen","fill_alpha":{"value":0.5},"fill_color":{"value":"lightgrey"},"left_units":"screen","level":"overlay","line_alpha":{"value":1.0},"line_color":{"value":"black"},"line_dash":[4,4],"line_width":{"value":2},"plot":null,"render_mode":"css","right_units":"screen","top_units":"screen"},"id":"3ab49e4a-f795-4381-94b3-efc3e850dc5a","type":"BoxAnnotation"},{"attributes":{"axis_label":"chrlen (% of genome)","formatter":{"id":"4c883086-833e-4e5f-bacf-f09e11af9063","type":"BasicTickFormatter"},"plot":{"id":"9cdc6597-0e59-4b87-8e34-3bef36c776b5","subtype":"Figure","type":"Plot"},"ticker":{"id":"9fd304fe-034c-4c17-ad83-fc9fd434453d","type":"BasicTicker"}},"id":"d08f4752-f891-40b1-b8da-f7a4b3bbfc41","type":"LinearAxis"},{"attributes":{"dimension":1,"plot":{"id":"9cdc6597-0e59-4b87-8e34-3bef36c776b5","subtype":"Figure","type":"Plot"},"ticker":{"id":"f8140b1f-d6c5-47fd-894f-c0a8e0c0d46f","type":"BasicTicker"}},"id":"0105ba64-e297-44f3-bccf-c1c20b6c103d","type":"Grid"},{"attributes":{"plot":{"id":"9cdc6597-0e59-4b87-8e34-3bef36c776b5","subtype":"Figure","type":"Plot"}},"id":"0372b9e9-bdca-40e3-b1cf-17d54c4b8a8f","type":"PanTool"},{"attributes":{"below":[{"id":"d08f4752-f891-40b1-b8da-f7a4b3bbfc41","type":"LinearAxis"}],"left":[{"id":"c007cb3a-783b-4dff-a21e-8ee56944d22b","type":"LinearAxis"}],"plot_width":800,"renderers":[{"id":"d08f4752-f891-40b1-b8da-f7a4b3bbfc41","type":"LinearAxis"},{"id":"6a1fc1a3-5de0-4475-ac20-1ad25d1dc381","type":"Grid"},{"id":"c007cb3a-783b-4dff-a21e-8ee56944d22b","type":"LinearAxis"},{"id":"0105ba64-e297-44f3-bccf-c1c20b6c103d","type":"Grid"},{"id":"705f9271-9b87-4486-bfde-071817ddf119","type":"BoxAnnotation"},{"id":"3ab49e4a-f795-4381-94b3-efc3e850dc5a","type":"BoxAnnotation"},{"id":"03d2690e-979b-43fb-9358-825f9095552b","type":"GlyphRenderer"}],"title":{"id":"e808c88e-2538-40f7-8276-6632506550af","type":"Title"},"tool_events":{"id":"9e35a544-e38d-48cc-933c-77c32372ed02","type":"ToolEvents"},"toolbar":{"id":"45d46c6a-4def-4b98-9220-75109ea6a0ba","type":"Toolbar"},"x_range":{"id":"af140d7f-7733-41ba-a2b9-3991fc25462d","type":"DataRange1d"},"y_range":{"id":"0a550961-81c3-4739-8bcf-116f1c44edd8","type":"DataRange1d"}},"id":"9cdc6597-0e59-4b87-8e34-3bef36c776b5","subtype":"Figure","type":"Plot"}],"root_ids":["9cdc6597-0e59-4b87-8e34-3bef36c776b5"]},"title":"Bokeh Application","version":"0.12.3"}};
                  var render_items = [{"docid":"9ef29b2e-5da5-4a62-afb0-7abb66eaeacd","elementid":"73b46e06-52d6-4592-84f0-6270775204cc","modelid":"9cdc6597-0e59-4b87-8e34-3bef36c776b5"}];
                  
                  Bokeh.embed.embed_items(docs_json, render_items);
              });
          });
        },
        function(Bokeh) {
          console.log("Bokeh: injecting CSS: https://cdn.pydata.org/bokeh/release/bokeh-0.12.3.min.css");
          Bokeh.embed.inject_css("https://cdn.pydata.org/bokeh/release/bokeh-0.12.3.min.css");
          console.log("Bokeh: injecting CSS: https://cdn.pydata.org/bokeh/release/bokeh-widgets-0.12.3.min.css");
          Bokeh.embed.inject_css("https://cdn.pydata.org/bokeh/release/bokeh-widgets-0.12.3.min.css");
        }
      ];
    
      function run_inline_js() {
        
        for (var i = 0; i < inline_js.length; i++) {
          inline_js[i](window.Bokeh);
        }
        
      }
    
      if (window._bokeh_is_loading === 0) {
        console.log("Bokeh: BokehJS loaded, going straight to plotting");
        run_inline_js();
      } else {
        load_libs(js_urls, function() {
          console.log("Bokeh: BokehJS plotting callback run at", now());
          run_inline_js();
        });
      }
    }(this));
});