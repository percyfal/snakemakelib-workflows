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
      };var element = document.getElementById("ac2aafa3-a74f-4773-b7e8-610eab04a85e");
      if (element == null) {
        console.log("Bokeh: ERROR: autoload.js configured with elementid 'ac2aafa3-a74f-4773-b7e8-610eab04a85e' but no matching script tag was found. ")
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
                  var docs_json = {"0d7bb9bb-49ef-40e4-9385-9e1615e0fc01":{"roots":{"references":[{"attributes":{},"id":"c2e4e5b6-4175-4dbb-b3e8-c2686a22b813","type":"BasicTicker"},{"attributes":{"fill_alpha":{"value":0.7},"fill_color":{"value":"#f22c40"},"line_color":{"value":"#f22c40"},"size":{"units":"screen","value":8},"x":{"field":"x_values"},"y":{"field":"y_values"}},"id":"85d462ee-5dc8-40c0-bd43-9aaa08f886f4","type":"Circle"},{"attributes":{"callback":null,"column_names":["y_values","x_values"],"data":{"chart_index":[null,null],"x_values":["S1","S2"],"y_values":[2000.0,2500.0]}},"id":"76e7a7c0-3ff9-4ca7-9ea6-b740860e68b5","type":"ColumnDataSource"},{"attributes":{"callback":null,"end":2550.0,"start":1950.0},"id":"51d48a3a-438e-4840-b713-819ffaa17716","type":"Range1d"},{"attributes":{"dimension":1,"plot":{"id":"ac5804b1-75af-4ea8-bc11-7af7c868dfea","subtype":"Chart","type":"Plot"},"ticker":{"id":"c2e4e5b6-4175-4dbb-b3e8-c2686a22b813","type":"BasicTicker"}},"id":"9b7ec8ec-c969-4b8a-9cf5-90b172e5daee","type":"Grid"},{"attributes":{"overlay":{"id":"baa09dae-b7cb-466c-8042-37b81eeb1ec9","type":"BoxAnnotation"},"plot":{"id":"ac5804b1-75af-4ea8-bc11-7af7c868dfea","subtype":"Chart","type":"Plot"}},"id":"d3b76221-daf6-484b-8e0f-b16c55aaeb30","type":"BoxZoomTool"},{"attributes":{"plot":{"id":"ac5804b1-75af-4ea8-bc11-7af7c868dfea","subtype":"Chart","type":"Plot"}},"id":"40c75f28-1262-4d33-8cf3-b22e94e7a602","type":"PanTool"},{"attributes":{"plot":{"id":"ac5804b1-75af-4ea8-bc11-7af7c868dfea","subtype":"Chart","type":"Plot"}},"id":"0f11a133-983c-4915-92f2-724011f82403","type":"WheelZoomTool"},{"attributes":{"plot":null,"text":"Percent duplication per sample"},"id":"43abef5b-0b19-4eed-9cc9-863d86e64b10","type":"Title"},{"attributes":{"data_source":{"id":"76e7a7c0-3ff9-4ca7-9ea6-b740860e68b5","type":"ColumnDataSource"},"glyph":{"id":"85d462ee-5dc8-40c0-bd43-9aaa08f886f4","type":"Circle"},"hover_glyph":null,"nonselection_glyph":null,"selection_glyph":null},"id":"63ceda40-46d0-495a-b257-3732d40f594c","type":"GlyphRenderer"},{"attributes":{"plot":{"id":"ac5804b1-75af-4ea8-bc11-7af7c868dfea","subtype":"Chart","type":"Plot"}},"id":"8c2482ed-915d-42ef-9308-eca38e0e5ab6","type":"Legend"},{"attributes":{},"id":"a0ce3144-44e9-449e-bbc4-a7d2f517f905","type":"CategoricalTickFormatter"},{"attributes":{"callback":null,"factors":["S1","S2"]},"id":"540a884a-e2f4-445b-8c18-162f4d002822","type":"FactorRange"},{"attributes":{"active_drag":"auto","active_scroll":"auto","active_tap":"auto","tools":[{"id":"40c75f28-1262-4d33-8cf3-b22e94e7a602","type":"PanTool"},{"id":"0f11a133-983c-4915-92f2-724011f82403","type":"WheelZoomTool"},{"id":"d3b76221-daf6-484b-8e0f-b16c55aaeb30","type":"BoxZoomTool"},{"id":"29d43b95-d214-452c-aded-348bef54ce73","type":"SaveTool"},{"id":"eaa99815-eb8e-421b-aa54-7dfbf1452e45","type":"ResetTool"},{"id":"f70b3f47-f09c-4e5e-9bf2-e7263fee38a4","type":"HelpTool"}]},"id":"7f766955-0dd1-4a60-9ccb-6ffc56486c8c","type":"Toolbar"},{"attributes":{"plot":{"id":"ac5804b1-75af-4ea8-bc11-7af7c868dfea","subtype":"Chart","type":"Plot"},"ticker":{"id":"d0a8980c-0719-47fd-885b-2e6292f5f5be","type":"CategoricalTicker"}},"id":"29c0bfb9-7fe2-4796-b0c4-fa03d9e5c752","type":"Grid"},{"attributes":{},"id":"e5a9a7ea-b5a0-40e5-8e8e-868542a68bf6","type":"ToolEvents"},{"attributes":{},"id":"4bf6c08c-dad5-418f-9c81-a1e826517218","type":"BasicTickFormatter"},{"attributes":{"below":[{"id":"176e281d-0917-4060-99ab-92b055835efa","type":"CategoricalAxis"}],"left":[{"id":"d1e5473f-ae45-4578-813f-b83f24418247","type":"LinearAxis"}],"renderers":[{"id":"baa09dae-b7cb-466c-8042-37b81eeb1ec9","type":"BoxAnnotation"},{"id":"63ceda40-46d0-495a-b257-3732d40f594c","type":"GlyphRenderer"},{"id":"8c2482ed-915d-42ef-9308-eca38e0e5ab6","type":"Legend"},{"id":"176e281d-0917-4060-99ab-92b055835efa","type":"CategoricalAxis"},{"id":"d1e5473f-ae45-4578-813f-b83f24418247","type":"LinearAxis"},{"id":"29c0bfb9-7fe2-4796-b0c4-fa03d9e5c752","type":"Grid"},{"id":"9b7ec8ec-c969-4b8a-9cf5-90b172e5daee","type":"Grid"}],"title":{"id":"43abef5b-0b19-4eed-9cc9-863d86e64b10","type":"Title"},"tool_events":{"id":"e5a9a7ea-b5a0-40e5-8e8e-868542a68bf6","type":"ToolEvents"},"toolbar":{"id":"7f766955-0dd1-4a60-9ccb-6ffc56486c8c","type":"Toolbar"},"x_mapper_type":"auto","x_range":{"id":"540a884a-e2f4-445b-8c18-162f4d002822","type":"FactorRange"},"y_mapper_type":"auto","y_range":{"id":"51d48a3a-438e-4840-b713-819ffaa17716","type":"Range1d"}},"id":"ac5804b1-75af-4ea8-bc11-7af7c868dfea","subtype":"Chart","type":"Plot"},{"attributes":{"axis_label":"SM","formatter":{"id":"a0ce3144-44e9-449e-bbc4-a7d2f517f905","type":"CategoricalTickFormatter"},"major_label_orientation":0.7853981633974483,"plot":{"id":"ac5804b1-75af-4ea8-bc11-7af7c868dfea","subtype":"Chart","type":"Plot"},"ticker":{"id":"d0a8980c-0719-47fd-885b-2e6292f5f5be","type":"CategoricalTicker"}},"id":"176e281d-0917-4060-99ab-92b055835efa","type":"CategoricalAxis"},{"attributes":{"axis_label":"PERCENT_DUPLICATION","formatter":{"id":"4bf6c08c-dad5-418f-9c81-a1e826517218","type":"BasicTickFormatter"},"plot":{"id":"ac5804b1-75af-4ea8-bc11-7af7c868dfea","subtype":"Chart","type":"Plot"},"ticker":{"id":"c2e4e5b6-4175-4dbb-b3e8-c2686a22b813","type":"BasicTicker"}},"id":"d1e5473f-ae45-4578-813f-b83f24418247","type":"LinearAxis"},{"attributes":{},"id":"d0a8980c-0719-47fd-885b-2e6292f5f5be","type":"CategoricalTicker"},{"attributes":{"plot":{"id":"ac5804b1-75af-4ea8-bc11-7af7c868dfea","subtype":"Chart","type":"Plot"}},"id":"f70b3f47-f09c-4e5e-9bf2-e7263fee38a4","type":"HelpTool"},{"attributes":{"plot":{"id":"ac5804b1-75af-4ea8-bc11-7af7c868dfea","subtype":"Chart","type":"Plot"}},"id":"eaa99815-eb8e-421b-aa54-7dfbf1452e45","type":"ResetTool"},{"attributes":{"plot":{"id":"ac5804b1-75af-4ea8-bc11-7af7c868dfea","subtype":"Chart","type":"Plot"}},"id":"29d43b95-d214-452c-aded-348bef54ce73","type":"SaveTool"},{"attributes":{"bottom_units":"screen","fill_alpha":{"value":0.5},"fill_color":{"value":"lightgrey"},"left_units":"screen","level":"overlay","line_alpha":{"value":1.0},"line_color":{"value":"black"},"line_dash":[4,4],"line_width":{"value":2},"plot":null,"render_mode":"css","right_units":"screen","top_units":"screen"},"id":"baa09dae-b7cb-466c-8042-37b81eeb1ec9","type":"BoxAnnotation"}],"root_ids":["ac5804b1-75af-4ea8-bc11-7af7c868dfea"]},"title":"Bokeh Application","version":"0.12.3"}};
                  var render_items = [{"docid":"0d7bb9bb-49ef-40e4-9385-9e1615e0fc01","elementid":"ac2aafa3-a74f-4773-b7e8-610eab04a85e","modelid":"ac5804b1-75af-4ea8-bc11-7af7c868dfea"}];
                  
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