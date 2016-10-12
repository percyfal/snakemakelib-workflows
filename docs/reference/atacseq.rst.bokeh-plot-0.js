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
      };var element = document.getElementById("f218b349-6c04-4591-8e5f-ea7e5ebc9a91");
      if (element == null) {
        console.log("Bokeh: ERROR: autoload.js configured with elementid 'f218b349-6c04-4591-8e5f-ea7e5ebc9a91' but no matching script tag was found. ")
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
                  var docs_json = {"221dcdc7-4b24-4128-99ec-70bdc8b915ac":{"roots":{"references":[{"attributes":{"overlay":{"id":"590e01dc-40ae-4872-9381-c3a62367e407","type":"BoxAnnotation"},"plot":{"id":"7efed012-4894-4bfc-af76-3aff48d90caa","subtype":"Chart","type":"Plot"}},"id":"4467b039-fb51-42c9-8e7b-0f60aa229354","type":"BoxZoomTool"},{"attributes":{},"id":"ef1e0081-b245-4649-bb2a-d461b4a8491e","type":"BasicTickFormatter"},{"attributes":{"callback":null,"factors":["S1_P1","S1_P2"]},"id":"9994b6c1-e3d8-4839-a931-1866eaa52b77","type":"FactorRange"},{"attributes":{"dimension":1,"plot":{"id":"7efed012-4894-4bfc-af76-3aff48d90caa","subtype":"Chart","type":"Plot"},"ticker":{"id":"e230098d-2968-47cf-9191-7a0c9f0317c1","type":"BasicTicker"}},"id":"ea435fde-2ae8-434c-9cc0-4a51cfe57af5","type":"Grid"},{"attributes":{},"id":"c41ca0ff-01bc-4260-9813-9454addf5ba5","type":"ToolEvents"},{"attributes":{"plot":null,"text":"Cutadapt metrics"},"id":"26ec30e6-4e8e-423a-964c-f5561b7b5f11","type":"Title"},{"attributes":{"items":[{"id":"c0423426-c2a3-409c-94da-cdd54600cc40","type":"LegendItem"}],"plot":{"id":"7efed012-4894-4bfc-af76-3aff48d90caa","subtype":"Chart","type":"Plot"}},"id":"e6d01e96-dc1f-4cbe-9f4f-68bac0a7bc98","type":"Legend"},{"attributes":{"label":{"value":"Read 1 percent"},"renderers":[{"id":"67e461ef-b178-44e3-baba-cd5cf8907ca5","type":"GlyphRenderer"}]},"id":"c0423426-c2a3-409c-94da-cdd54600cc40","type":"LegendItem"},{"attributes":{"plot":{"id":"7efed012-4894-4bfc-af76-3aff48d90caa","subtype":"Chart","type":"Plot"}},"id":"33f6096a-8c85-4989-834c-6e7832a43c9e","type":"SaveTool"},{"attributes":{"callback":null,"column_names":["y_values","x_values"],"data":{"chart_index":[{"statistic":"Read 1 percent"},{"statistic":"Read 1 percent"}],"statistic":["Read 1 percent","Read 1 percent"],"x_values":["S1_P1","S1_P2"],"y_values":[80,40]}},"id":"d7e4a631-bffc-40e4-8def-1ec4e03ed7e3","type":"ColumnDataSource"},{"attributes":{},"id":"1a066b18-2246-45e3-bb4d-7d5a3344c585","type":"CategoricalTicker"},{"attributes":{"active_drag":"auto","active_scroll":"auto","active_tap":"auto","tools":[{"id":"d4bb6d5d-73ea-4fe3-ba95-e0b275ab352b","type":"PanTool"},{"id":"19477200-9971-4987-90df-1bd05a689999","type":"WheelZoomTool"},{"id":"4467b039-fb51-42c9-8e7b-0f60aa229354","type":"BoxZoomTool"},{"id":"33f6096a-8c85-4989-834c-6e7832a43c9e","type":"SaveTool"},{"id":"6235d427-2421-488f-96a5-fc1584f1b2f1","type":"ResetTool"},{"id":"7517d85a-6cbc-4d3c-b2af-b1a75b2375ad","type":"HelpTool"}]},"id":"49d176c2-d255-49ae-ba89-c4611c8813bc","type":"Toolbar"},{"attributes":{"data_source":{"id":"d7e4a631-bffc-40e4-8def-1ec4e03ed7e3","type":"ColumnDataSource"},"glyph":{"id":"6e660f63-bd46-49cd-8cff-880235ea9a42","type":"Circle"},"hover_glyph":null,"nonselection_glyph":null,"selection_glyph":null},"id":"67e461ef-b178-44e3-baba-cd5cf8907ca5","type":"GlyphRenderer"},{"attributes":{"below":[{"id":"fbb97245-0309-45d4-b2ad-affb96f46587","type":"CategoricalAxis"}],"left":[{"id":"5d8b742f-9289-4b45-8e4b-4e9b48cebfaf","type":"LinearAxis"}],"renderers":[{"id":"590e01dc-40ae-4872-9381-c3a62367e407","type":"BoxAnnotation"},{"id":"67e461ef-b178-44e3-baba-cd5cf8907ca5","type":"GlyphRenderer"},{"id":"e6d01e96-dc1f-4cbe-9f4f-68bac0a7bc98","type":"Legend"},{"id":"fbb97245-0309-45d4-b2ad-affb96f46587","type":"CategoricalAxis"},{"id":"5d8b742f-9289-4b45-8e4b-4e9b48cebfaf","type":"LinearAxis"},{"id":"034b1593-06e0-4055-8888-f0b5ca874d75","type":"Grid"},{"id":"ea435fde-2ae8-434c-9cc0-4a51cfe57af5","type":"Grid"}],"title":{"id":"26ec30e6-4e8e-423a-964c-f5561b7b5f11","type":"Title"},"tool_events":{"id":"c41ca0ff-01bc-4260-9813-9454addf5ba5","type":"ToolEvents"},"toolbar":{"id":"49d176c2-d255-49ae-ba89-c4611c8813bc","type":"Toolbar"},"x_mapper_type":"auto","x_range":{"id":"9994b6c1-e3d8-4839-a931-1866eaa52b77","type":"FactorRange"},"y_mapper_type":"auto","y_range":{"id":"122b730c-dcc7-4072-8f74-4d70ae665ee1","type":"Range1d"}},"id":"7efed012-4894-4bfc-af76-3aff48d90caa","subtype":"Chart","type":"Plot"},{"attributes":{"axis_label":"PlatformUnit","formatter":{"id":"312d9f17-1ef1-4941-b561-a2c39f6376d0","type":"CategoricalTickFormatter"},"major_label_orientation":0.7853981633974483,"plot":{"id":"7efed012-4894-4bfc-af76-3aff48d90caa","subtype":"Chart","type":"Plot"},"ticker":{"id":"1a066b18-2246-45e3-bb4d-7d5a3344c585","type":"CategoricalTicker"}},"id":"fbb97245-0309-45d4-b2ad-affb96f46587","type":"CategoricalAxis"},{"attributes":{"axis_label":"% reads with adapter","formatter":{"id":"ef1e0081-b245-4649-bb2a-d461b4a8491e","type":"BasicTickFormatter"},"plot":{"id":"7efed012-4894-4bfc-af76-3aff48d90caa","subtype":"Chart","type":"Plot"},"ticker":{"id":"e230098d-2968-47cf-9191-7a0c9f0317c1","type":"BasicTicker"}},"id":"5d8b742f-9289-4b45-8e4b-4e9b48cebfaf","type":"LinearAxis"},{"attributes":{"plot":{"id":"7efed012-4894-4bfc-af76-3aff48d90caa","subtype":"Chart","type":"Plot"}},"id":"6235d427-2421-488f-96a5-fc1584f1b2f1","type":"ResetTool"},{"attributes":{},"id":"312d9f17-1ef1-4941-b561-a2c39f6376d0","type":"CategoricalTickFormatter"},{"attributes":{"bottom_units":"screen","fill_alpha":{"value":0.5},"fill_color":{"value":"lightgrey"},"left_units":"screen","level":"overlay","line_alpha":{"value":1.0},"line_color":{"value":"black"},"line_dash":[4,4],"line_width":{"value":2},"plot":null,"render_mode":"css","right_units":"screen","top_units":"screen"},"id":"590e01dc-40ae-4872-9381-c3a62367e407","type":"BoxAnnotation"},{"attributes":{"plot":{"id":"7efed012-4894-4bfc-af76-3aff48d90caa","subtype":"Chart","type":"Plot"},"ticker":{"id":"1a066b18-2246-45e3-bb4d-7d5a3344c585","type":"CategoricalTicker"}},"id":"034b1593-06e0-4055-8888-f0b5ca874d75","type":"Grid"},{"attributes":{"plot":{"id":"7efed012-4894-4bfc-af76-3aff48d90caa","subtype":"Chart","type":"Plot"}},"id":"7517d85a-6cbc-4d3c-b2af-b1a75b2375ad","type":"HelpTool"},{"attributes":{},"id":"e230098d-2968-47cf-9191-7a0c9f0317c1","type":"BasicTicker"},{"attributes":{"callback":null,"end":84.0,"start":36.0},"id":"122b730c-dcc7-4072-8f74-4d70ae665ee1","type":"Range1d"},{"attributes":{"plot":{"id":"7efed012-4894-4bfc-af76-3aff48d90caa","subtype":"Chart","type":"Plot"}},"id":"19477200-9971-4987-90df-1bd05a689999","type":"WheelZoomTool"},{"attributes":{"fill_alpha":{"value":0.7},"fill_color":{"value":"#f22c40"},"line_color":{"value":"#f22c40"},"size":{"units":"screen","value":8},"x":{"field":"x_values"},"y":{"field":"y_values"}},"id":"6e660f63-bd46-49cd-8cff-880235ea9a42","type":"Circle"},{"attributes":{"plot":{"id":"7efed012-4894-4bfc-af76-3aff48d90caa","subtype":"Chart","type":"Plot"}},"id":"d4bb6d5d-73ea-4fe3-ba95-e0b275ab352b","type":"PanTool"}],"root_ids":["7efed012-4894-4bfc-af76-3aff48d90caa"]},"title":"Bokeh Application","version":"0.12.3"}};
                  var render_items = [{"docid":"221dcdc7-4b24-4128-99ec-70bdc8b915ac","elementid":"f218b349-6c04-4591-8e5f-ea7e5ebc9a91","modelid":"7efed012-4894-4bfc-af76-3aff48d90caa"}];
                  
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