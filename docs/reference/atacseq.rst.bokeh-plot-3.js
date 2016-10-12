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
      };var element = document.getElementById("61ce2b75-c804-4a7c-ae2c-561374667d08");
      if (element == null) {
        console.log("Bokeh: ERROR: autoload.js configured with elementid '61ce2b75-c804-4a7c-ae2c-561374667d08' but no matching script tag was found. ")
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
                  var docs_json = {"bbf8774a-7765-47ef-8684-0bc8db547011":{"roots":{"references":[{"attributes":{"callback":null,"end":144.0,"start":96.0},"id":"01396b47-ce65-4977-b33c-5bd3147c6aa2","type":"Range1d"},{"attributes":{"plot":{"id":"87400fac-ebe9-4c44-b910-6af6240694c3","subtype":"Chart","type":"Plot"}},"id":"a6db92e4-a908-4819-a38a-c83e13984f1e","type":"SaveTool"},{"attributes":{"items":[{"id":"5b6cb768-1524-49d4-a915-bad7c40abc1e","type":"LegendItem"},{"id":"81f1a42b-099d-49bc-b6a9-23a2c378bc44","type":"LegendItem"}],"plot":{"id":"87400fac-ebe9-4c44-b910-6af6240694c3","subtype":"Chart","type":"Plot"}},"id":"1fc59613-f001-4d0a-bbe5-087efe3cde59","type":"Legend"},{"attributes":{},"id":"4faf4be5-b91a-45d8-9588-cd0c74b47a3d","type":"ToolEvents"},{"attributes":{"axis_label":"MEAN_INSERT_SIZE","formatter":{"id":"552deab1-39ef-43fa-abb5-f17790e03d64","type":"BasicTickFormatter"},"plot":{"id":"87400fac-ebe9-4c44-b910-6af6240694c3","subtype":"Chart","type":"Plot"},"ticker":{"id":"f6298a4e-a267-497b-b6df-c0f9f29e91b6","type":"BasicTicker"}},"id":"8d74629e-2752-47a2-aa76-0e18f4a5b659","type":"LinearAxis"},{"attributes":{"plot":{"id":"87400fac-ebe9-4c44-b910-6af6240694c3","subtype":"Chart","type":"Plot"}},"id":"ebfdc525-82c6-4292-b35f-9eb6baebf9c0","type":"WheelZoomTool"},{"attributes":{"plot":{"id":"87400fac-ebe9-4c44-b910-6af6240694c3","subtype":"Chart","type":"Plot"}},"id":"39bb284b-76d3-4d10-8bbd-45fc891ebe5a","type":"PanTool"},{"attributes":{"bottom_units":"screen","fill_alpha":{"value":0.5},"fill_color":{"value":"lightgrey"},"left_units":"screen","level":"overlay","line_alpha":{"value":1.0},"line_color":{"value":"black"},"line_dash":[4,4],"line_width":{"value":2},"plot":null,"render_mode":"css","right_units":"screen","top_units":"screen"},"id":"2523c21e-0718-421e-a370-93cc1717dd7b","type":"BoxAnnotation"},{"attributes":{"plot":null,"text":"Mean insert size"},"id":"99489d05-f4a7-4d3b-a56d-a114e0f776f7","type":"Title"},{"attributes":{"plot":{"id":"87400fac-ebe9-4c44-b910-6af6240694c3","subtype":"Chart","type":"Plot"}},"id":"064d3341-d0d6-4669-86c8-a7a8541c1ee6","type":"ResetTool"},{"attributes":{"fill_alpha":{"value":0.7},"fill_color":{"value":"#5ab738"},"line_color":{"value":"#5ab738"},"size":{"units":"screen","value":8},"x":{"field":"x_values"},"y":{"field":"y_values"}},"id":"f7974750-e2f6-41be-acaa-bed6fa09c94d","type":"Circle"},{"attributes":{"dimension":1,"plot":{"id":"87400fac-ebe9-4c44-b910-6af6240694c3","subtype":"Chart","type":"Plot"},"ticker":{"id":"f6298a4e-a267-497b-b6df-c0f9f29e91b6","type":"BasicTicker"}},"id":"deaa7ee5-5be4-4213-baa2-8480019c8a4c","type":"Grid"},{"attributes":{"active_drag":"auto","active_scroll":"auto","active_tap":"auto","tools":[{"id":"39bb284b-76d3-4d10-8bbd-45fc891ebe5a","type":"PanTool"},{"id":"ebfdc525-82c6-4292-b35f-9eb6baebf9c0","type":"WheelZoomTool"},{"id":"4a442cfa-1c0f-48d3-b678-095ff66c66b1","type":"BoxZoomTool"},{"id":"a6db92e4-a908-4819-a38a-c83e13984f1e","type":"SaveTool"},{"id":"064d3341-d0d6-4669-86c8-a7a8541c1ee6","type":"ResetTool"},{"id":"d21f5711-6f09-4196-8df7-b00a9146410a","type":"HelpTool"}]},"id":"58f88d35-c27a-4cf8-abf1-f4ba16d49c94","type":"Toolbar"},{"attributes":{"label":{"value":"FR"},"renderers":[{"id":"44d54b51-aca6-4e7e-839d-9843713aa8e5","type":"GlyphRenderer"}]},"id":"5b6cb768-1524-49d4-a915-bad7c40abc1e","type":"LegendItem"},{"attributes":{"callback":null,"factors":["S1","S2"]},"id":"4c7f9c5a-4f53-4300-9ccf-dd4b0dda8508","type":"FactorRange"},{"attributes":{},"id":"f6298a4e-a267-497b-b6df-c0f9f29e91b6","type":"BasicTicker"},{"attributes":{"plot":{"id":"87400fac-ebe9-4c44-b910-6af6240694c3","subtype":"Chart","type":"Plot"}},"id":"d21f5711-6f09-4196-8df7-b00a9146410a","type":"HelpTool"},{"attributes":{"plot":{"id":"87400fac-ebe9-4c44-b910-6af6240694c3","subtype":"Chart","type":"Plot"},"ticker":{"id":"b1374be4-bd35-485f-86de-d53e96f64583","type":"CategoricalTicker"}},"id":"e4620ddf-17ac-4638-8b1b-b4f2c5db06de","type":"Grid"},{"attributes":{"data_source":{"id":"ecc5f16a-0b74-4b2e-bcb4-b0b12deb03a6","type":"ColumnDataSource"},"glyph":{"id":"f7974750-e2f6-41be-acaa-bed6fa09c94d","type":"Circle"},"hover_glyph":null,"nonselection_glyph":null,"selection_glyph":null},"id":"77e4dd90-cf77-48e2-a40b-4e8d43126e76","type":"GlyphRenderer"},{"attributes":{"axis_label":"SM","formatter":{"id":"c5be0f91-c392-4566-8a84-794802b6c900","type":"CategoricalTickFormatter"},"major_label_orientation":0.7853981633974483,"plot":{"id":"87400fac-ebe9-4c44-b910-6af6240694c3","subtype":"Chart","type":"Plot"},"ticker":{"id":"b1374be4-bd35-485f-86de-d53e96f64583","type":"CategoricalTicker"}},"id":"b8683a0e-42de-43b4-81fc-215571cd7ebc","type":"CategoricalAxis"},{"attributes":{},"id":"552deab1-39ef-43fa-abb5-f17790e03d64","type":"BasicTickFormatter"},{"attributes":{"data_source":{"id":"1faed82a-ce2b-4391-a775-44172da66e9b","type":"ColumnDataSource"},"glyph":{"id":"90578a17-184e-412e-b718-6fea7bd62306","type":"Circle"},"hover_glyph":null,"nonselection_glyph":null,"selection_glyph":null},"id":"44d54b51-aca6-4e7e-839d-9843713aa8e5","type":"GlyphRenderer"},{"attributes":{},"id":"b1374be4-bd35-485f-86de-d53e96f64583","type":"CategoricalTicker"},{"attributes":{},"id":"c5be0f91-c392-4566-8a84-794802b6c900","type":"CategoricalTickFormatter"},{"attributes":{"label":{"value":"RF"},"renderers":[{"id":"77e4dd90-cf77-48e2-a40b-4e8d43126e76","type":"GlyphRenderer"}]},"id":"81f1a42b-099d-49bc-b6a9-23a2c378bc44","type":"LegendItem"},{"attributes":{"overlay":{"id":"2523c21e-0718-421e-a370-93cc1717dd7b","type":"BoxAnnotation"},"plot":{"id":"87400fac-ebe9-4c44-b910-6af6240694c3","subtype":"Chart","type":"Plot"}},"id":"4a442cfa-1c0f-48d3-b678-095ff66c66b1","type":"BoxZoomTool"},{"attributes":{"callback":null,"column_names":["y_values","x_values"],"data":{"PAIR_ORIENTATION":["FR","FR"],"chart_index":[{"PAIR_ORIENTATION":"FR"},{"PAIR_ORIENTATION":"FR"}],"x_values":["S1","S2"],"y_values":[120,140]}},"id":"1faed82a-ce2b-4391-a775-44172da66e9b","type":"ColumnDataSource"},{"attributes":{"below":[{"id":"b8683a0e-42de-43b4-81fc-215571cd7ebc","type":"CategoricalAxis"}],"height":400,"left":[{"id":"8d74629e-2752-47a2-aa76-0e18f4a5b659","type":"LinearAxis"}],"renderers":[{"id":"2523c21e-0718-421e-a370-93cc1717dd7b","type":"BoxAnnotation"},{"id":"44d54b51-aca6-4e7e-839d-9843713aa8e5","type":"GlyphRenderer"},{"id":"77e4dd90-cf77-48e2-a40b-4e8d43126e76","type":"GlyphRenderer"},{"id":"1fc59613-f001-4d0a-bbe5-087efe3cde59","type":"Legend"},{"id":"b8683a0e-42de-43b4-81fc-215571cd7ebc","type":"CategoricalAxis"},{"id":"8d74629e-2752-47a2-aa76-0e18f4a5b659","type":"LinearAxis"},{"id":"e4620ddf-17ac-4638-8b1b-b4f2c5db06de","type":"Grid"},{"id":"deaa7ee5-5be4-4213-baa2-8480019c8a4c","type":"Grid"}],"title":{"id":"99489d05-f4a7-4d3b-a56d-a114e0f776f7","type":"Title"},"tool_events":{"id":"4faf4be5-b91a-45d8-9588-cd0c74b47a3d","type":"ToolEvents"},"toolbar":{"id":"58f88d35-c27a-4cf8-abf1-f4ba16d49c94","type":"Toolbar"},"width":400,"x_mapper_type":"auto","x_range":{"id":"4c7f9c5a-4f53-4300-9ccf-dd4b0dda8508","type":"FactorRange"},"y_mapper_type":"auto","y_range":{"id":"01396b47-ce65-4977-b33c-5bd3147c6aa2","type":"Range1d"}},"id":"87400fac-ebe9-4c44-b910-6af6240694c3","subtype":"Chart","type":"Plot"},{"attributes":{"callback":null,"column_names":["y_values","x_values"],"data":{"PAIR_ORIENTATION":["RF","RF"],"chart_index":[{"PAIR_ORIENTATION":"RF"},{"PAIR_ORIENTATION":"RF"}],"x_values":["S1","S2"],"y_values":[100,120]}},"id":"ecc5f16a-0b74-4b2e-bcb4-b0b12deb03a6","type":"ColumnDataSource"},{"attributes":{"fill_alpha":{"value":0.7},"fill_color":{"value":"#f22c40"},"line_color":{"value":"#f22c40"},"size":{"units":"screen","value":8},"x":{"field":"x_values"},"y":{"field":"y_values"}},"id":"90578a17-184e-412e-b718-6fea7bd62306","type":"Circle"}],"root_ids":["87400fac-ebe9-4c44-b910-6af6240694c3"]},"title":"Bokeh Application","version":"0.12.3"}};
                  var render_items = [{"docid":"bbf8774a-7765-47ef-8684-0bc8db547011","elementid":"61ce2b75-c804-4a7c-ae2c-561374667d08","modelid":"87400fac-ebe9-4c44-b910-6af6240694c3"}];
                  
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