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
      };var element = document.getElementById("83fb7d71-7d4b-4b60-93cd-c0c8a72d6c12");
      if (element == null) {
        console.log("Bokeh: ERROR: autoload.js configured with elementid '83fb7d71-7d4b-4b60-93cd-c0c8a72d6c12' but no matching script tag was found. ")
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
                  var docs_json = {"95474756-291d-4e3a-9d3e-68df9995b132":{"roots":{"references":[{"attributes":{"plot":{"id":"aae1ba01-e372-456d-8e7e-7e83c708083d","subtype":"Figure","type":"Plot"}},"id":"cb7ddbba-02ff-4267-9b5b-9f1426fb729c","type":"ResetTool"},{"attributes":{"dimension":1,"plot":{"id":"aae1ba01-e372-456d-8e7e-7e83c708083d","subtype":"Figure","type":"Plot"},"ticker":{"id":"929cdea9-9bdb-4d5c-a71a-7c75ff7b074f","type":"BasicTicker"}},"id":"9d841225-0e8e-405f-9db9-f72ea078f5a4","type":"Grid"},{"attributes":{"callback":null,"column_names":["mean_coverage","sd","chrlen","chr","mapped_bases","index","chrlen_percent","mapped_bases_percent","SM"],"data":{"SM":["S1","S1","S2","S2"],"chr":["chr1","chr2","chr1","chr2"],"chrlen":[4000000.0,1000000.0,4000000.0,1000000.0],"chrlen_percent":[80,20,80,20],"index":[0,1,2,3],"mapped_bases":[8000000.0,12000000.0,12000000.0,8000000.0],"mapped_bases_percent":[40,60,60,40],"mean_coverage":[2,12,3,8],"sd":[5,20,5,20]}},"id":"ea2e2f99-26b4-44be-aeb7-8ca7b8cbdd56","type":"ColumnDataSource"},{"attributes":{"plot":null,"text":null},"id":"94fff8fb-eb35-44fd-a9e1-91e982bc24d5","type":"Title"},{"attributes":{"plot":{"id":"aae1ba01-e372-456d-8e7e-7e83c708083d","subtype":"Figure","type":"Plot"},"ticker":{"id":"bd263f92-b912-4dc7-ad82-394f65658145","type":"BasicTicker"}},"id":"430f987a-974e-472a-b0d6-d77842b43a64","type":"Grid"},{"attributes":{},"id":"5f9ef333-0998-4a56-9af6-7aefcfc888ed","type":"BasicTickFormatter"},{"attributes":{"fill_alpha":{"value":0.9},"fill_color":{"field":"SM"},"line_alpha":{"value":0.9},"line_color":{"field":"SM"},"size":{"units":"screen","value":6},"x":{"field":"chrlen_percent"},"y":{"field":"mapped_bases_percent"}},"id":"eed54d07-e77d-48ec-b53e-234ccfe826b9","type":"Circle"},{"attributes":{"callback":null,"overlay":{"id":"0cc58a91-e1f3-4a07-b152-c25df9d625d8","type":"BoxAnnotation"},"plot":{"id":"aae1ba01-e372-456d-8e7e-7e83c708083d","subtype":"Figure","type":"Plot"},"renderers":[{"id":"e5f5c4f6-e323-4f7d-9fa4-8470736c5601","type":"GlyphRenderer"}]},"id":"c0801b55-64cf-4d53-8e63-75402568966f","type":"BoxSelectTool"},{"attributes":{"callback":null},"id":"ad80d1cf-fbb0-4ace-89a7-02dad97ac267","type":"DataRange1d"},{"attributes":{"plot":{"id":"aae1ba01-e372-456d-8e7e-7e83c708083d","subtype":"Figure","type":"Plot"}},"id":"879f3a7c-c22d-424b-8a11-bc18eb4c75b7","type":"WheelZoomTool"},{"attributes":{"plot":{"id":"aae1ba01-e372-456d-8e7e-7e83c708083d","subtype":"Figure","type":"Plot"}},"id":"e794a36a-f0ad-4215-bbd6-d32baeb3c970","type":"SaveTool"},{"attributes":{},"id":"929cdea9-9bdb-4d5c-a71a-7c75ff7b074f","type":"BasicTicker"},{"attributes":{"bottom_units":"screen","fill_alpha":{"value":0.5},"fill_color":{"value":"lightgrey"},"left_units":"screen","level":"overlay","line_alpha":{"value":1.0},"line_color":{"value":"black"},"line_dash":[4,4],"line_width":{"value":2},"plot":null,"render_mode":"css","right_units":"screen","top_units":"screen"},"id":"0cc58a91-e1f3-4a07-b152-c25df9d625d8","type":"BoxAnnotation"},{"attributes":{"axis_label":"mapped reads (% of total)","formatter":{"id":"afd0c863-b0ea-4c67-9120-86978d7b6d51","type":"BasicTickFormatter"},"plot":{"id":"aae1ba01-e372-456d-8e7e-7e83c708083d","subtype":"Figure","type":"Plot"},"ticker":{"id":"929cdea9-9bdb-4d5c-a71a-7c75ff7b074f","type":"BasicTicker"}},"id":"78c989df-3769-4085-bfe6-5691e4bb3f2c","type":"LinearAxis"},{"attributes":{"callback":null},"id":"5f384fca-8ae7-48e7-b138-af25d6ddbf59","type":"DataRange1d"},{"attributes":{},"id":"afd0c863-b0ea-4c67-9120-86978d7b6d51","type":"BasicTickFormatter"},{"attributes":{"plot":{"id":"aae1ba01-e372-456d-8e7e-7e83c708083d","subtype":"Figure","type":"Plot"}},"id":"1d31e6a2-bdc3-4df6-aad2-8e617273a00a","type":"ResizeTool"},{"attributes":{"bottom_units":"screen","fill_alpha":{"value":0.5},"fill_color":{"value":"lightgrey"},"left_units":"screen","level":"overlay","line_alpha":{"value":1.0},"line_color":{"value":"black"},"line_dash":[4,4],"line_width":{"value":2},"plot":null,"render_mode":"css","right_units":"screen","top_units":"screen"},"id":"c0ba20d8-9d99-484c-a1e3-15b4319fb930","type":"BoxAnnotation"},{"attributes":{},"id":"bd263f92-b912-4dc7-ad82-394f65658145","type":"BasicTicker"},{"attributes":{"data_source":{"id":"ea2e2f99-26b4-44be-aeb7-8ca7b8cbdd56","type":"ColumnDataSource"},"glyph":{"id":"eed54d07-e77d-48ec-b53e-234ccfe826b9","type":"Circle"},"hover_glyph":null,"nonselection_glyph":{"id":"fc4b920e-5053-48b4-9388-462d06ae8db1","type":"Circle"},"selection_glyph":null},"id":"e5f5c4f6-e323-4f7d-9fa4-8470736c5601","type":"GlyphRenderer"},{"attributes":{"plot":{"id":"aae1ba01-e372-456d-8e7e-7e83c708083d","subtype":"Figure","type":"Plot"}},"id":"12723eba-991f-4b9e-86a2-46eb25b82601","type":"PanTool"},{"attributes":{"axis_label":"chrlen (% of genome)","formatter":{"id":"5f9ef333-0998-4a56-9af6-7aefcfc888ed","type":"BasicTickFormatter"},"plot":{"id":"aae1ba01-e372-456d-8e7e-7e83c708083d","subtype":"Figure","type":"Plot"},"ticker":{"id":"bd263f92-b912-4dc7-ad82-394f65658145","type":"BasicTicker"}},"id":"b0df7832-1e55-4b55-88c6-056903ddba9f","type":"LinearAxis"},{"attributes":{"active_drag":"auto","active_scroll":"auto","active_tap":"auto","tools":[{"id":"12723eba-991f-4b9e-86a2-46eb25b82601","type":"PanTool"},{"id":"879f3a7c-c22d-424b-8a11-bc18eb4c75b7","type":"WheelZoomTool"},{"id":"ea29c9c4-46cb-4407-9450-857ef803e5d2","type":"BoxZoomTool"},{"id":"c0801b55-64cf-4d53-8e63-75402568966f","type":"BoxSelectTool"},{"id":"cb7ddbba-02ff-4267-9b5b-9f1426fb729c","type":"ResetTool"},{"id":"e794a36a-f0ad-4215-bbd6-d32baeb3c970","type":"SaveTool"},{"id":"671caf9f-c6cb-4f8e-8ec5-b27bc76700c5","type":"HoverTool"},{"id":"1d31e6a2-bdc3-4df6-aad2-8e617273a00a","type":"ResizeTool"}]},"id":"82db825b-ce90-42fa-9b70-cb0cb024945d","type":"Toolbar"},{"attributes":{"below":[{"id":"b0df7832-1e55-4b55-88c6-056903ddba9f","type":"LinearAxis"}],"left":[{"id":"78c989df-3769-4085-bfe6-5691e4bb3f2c","type":"LinearAxis"}],"plot_width":800,"renderers":[{"id":"b0df7832-1e55-4b55-88c6-056903ddba9f","type":"LinearAxis"},{"id":"430f987a-974e-472a-b0d6-d77842b43a64","type":"Grid"},{"id":"78c989df-3769-4085-bfe6-5691e4bb3f2c","type":"LinearAxis"},{"id":"9d841225-0e8e-405f-9db9-f72ea078f5a4","type":"Grid"},{"id":"c0ba20d8-9d99-484c-a1e3-15b4319fb930","type":"BoxAnnotation"},{"id":"0cc58a91-e1f3-4a07-b152-c25df9d625d8","type":"BoxAnnotation"},{"id":"e5f5c4f6-e323-4f7d-9fa4-8470736c5601","type":"GlyphRenderer"}],"title":{"id":"94fff8fb-eb35-44fd-a9e1-91e982bc24d5","type":"Title"},"tool_events":{"id":"71848e82-6432-479a-ae6d-7bb27ea2f5c6","type":"ToolEvents"},"toolbar":{"id":"82db825b-ce90-42fa-9b70-cb0cb024945d","type":"Toolbar"},"x_range":{"id":"ad80d1cf-fbb0-4ace-89a7-02dad97ac267","type":"DataRange1d"},"y_range":{"id":"5f384fca-8ae7-48e7-b138-af25d6ddbf59","type":"DataRange1d"}},"id":"aae1ba01-e372-456d-8e7e-7e83c708083d","subtype":"Figure","type":"Plot"},{"attributes":{"callback":null,"plot":{"id":"aae1ba01-e372-456d-8e7e-7e83c708083d","subtype":"Figure","type":"Plot"},"tooltips":[["Sample","@SM"],["Chromosome","@chr"]]},"id":"671caf9f-c6cb-4f8e-8ec5-b27bc76700c5","type":"HoverTool"},{"attributes":{"fill_alpha":{"value":0.1},"fill_color":{"value":"#1f77b4"},"line_alpha":{"value":0.1},"line_color":{"value":"#1f77b4"},"size":{"units":"screen","value":6},"x":{"field":"chrlen_percent"},"y":{"field":"mapped_bases_percent"}},"id":"fc4b920e-5053-48b4-9388-462d06ae8db1","type":"Circle"},{"attributes":{},"id":"71848e82-6432-479a-ae6d-7bb27ea2f5c6","type":"ToolEvents"},{"attributes":{"overlay":{"id":"c0ba20d8-9d99-484c-a1e3-15b4319fb930","type":"BoxAnnotation"},"plot":{"id":"aae1ba01-e372-456d-8e7e-7e83c708083d","subtype":"Figure","type":"Plot"}},"id":"ea29c9c4-46cb-4407-9450-857ef803e5d2","type":"BoxZoomTool"}],"root_ids":["aae1ba01-e372-456d-8e7e-7e83c708083d"]},"title":"Bokeh Application","version":"0.12.3"}};
                  var render_items = [{"docid":"95474756-291d-4e3a-9d3e-68df9995b132","elementid":"83fb7d71-7d4b-4b60-93cd-c0c8a72d6c12","modelid":"aae1ba01-e372-456d-8e7e-7e83c708083d"}];
                  
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