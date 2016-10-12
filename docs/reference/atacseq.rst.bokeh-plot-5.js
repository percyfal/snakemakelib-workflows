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
      };var element = document.getElementById("abcd8e0d-1ee6-4679-8fe6-8eb46d1265d3");
      if (element == null) {
        console.log("Bokeh: ERROR: autoload.js configured with elementid 'abcd8e0d-1ee6-4679-8fe6-8eb46d1265d3' but no matching script tag was found. ")
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
                  var docs_json = {"ef298dbe-786c-4c39-9d6e-6303dba84aee":{"roots":{"references":[{"attributes":{"data_source":{"id":"d7a7f849-54e0-449e-b43b-9456d2f66dc7","type":"ColumnDataSource"},"glyph":{"id":"00993a06-3857-4570-8aff-3cdf269d9789","type":"Circle"},"hover_glyph":null,"nonselection_glyph":null,"selection_glyph":null},"id":"bbd4779a-7140-41f5-bf11-d97425c72a80","type":"GlyphRenderer"},{"attributes":{"callback":null,"end":2550.0,"start":1950.0},"id":"e98574a1-ae37-43c2-bc3a-6ec8ac26cc14","type":"Range1d"},{"attributes":{"plot":{"id":"d410dc27-3837-46d3-aa9b-ed436d9baba1","subtype":"Chart","type":"Plot"}},"id":"59fcef43-d0e0-46b4-a901-ea87653042e4","type":"HelpTool"},{"attributes":{"active_drag":"auto","active_scroll":"auto","active_tap":"auto","tools":[{"id":"db9732ef-c1e5-4185-841d-90e9897b30ef","type":"PanTool"},{"id":"c7fac8cb-a86f-4f6a-9ba7-9e1cfdcfa4e4","type":"WheelZoomTool"},{"id":"1451ca57-50c3-45c9-8135-5c7b400ed63c","type":"BoxZoomTool"},{"id":"52799108-26a2-40ed-8fed-8090f4e17c38","type":"SaveTool"},{"id":"a1ebe57a-6d4c-4cef-b9f5-4401e2a382f4","type":"ResetTool"},{"id":"59fcef43-d0e0-46b4-a901-ea87653042e4","type":"HelpTool"}]},"id":"29c48f3a-6353-4e58-a235-8f15e8b49ca8","type":"Toolbar"},{"attributes":{"dimension":1,"plot":{"id":"d410dc27-3837-46d3-aa9b-ed436d9baba1","subtype":"Chart","type":"Plot"},"ticker":{"id":"89333e89-4453-4df5-b77d-d300d6f7a6d4","type":"BasicTicker"}},"id":"d9e28592-45bf-4244-a56c-87ce46c8dc3e","type":"Grid"},{"attributes":{"plot":{"id":"d410dc27-3837-46d3-aa9b-ed436d9baba1","subtype":"Chart","type":"Plot"}},"id":"a1ebe57a-6d4c-4cef-b9f5-4401e2a382f4","type":"ResetTool"},{"attributes":{},"id":"84afbf63-4ae0-4c47-a9a7-e218e298dbe4","type":"ToolEvents"},{"attributes":{"fill_alpha":{"value":0.7},"fill_color":{"value":"#f22c40"},"line_color":{"value":"#f22c40"},"size":{"units":"screen","value":8},"x":{"field":"x_values"},"y":{"field":"y_values"}},"id":"00993a06-3857-4570-8aff-3cdf269d9789","type":"Circle"},{"attributes":{"plot":{"id":"d410dc27-3837-46d3-aa9b-ed436d9baba1","subtype":"Chart","type":"Plot"}},"id":"db9732ef-c1e5-4185-841d-90e9897b30ef","type":"PanTool"},{"attributes":{},"id":"31187afa-14db-4f04-9ff8-25cdbe795e3b","type":"CategoricalTicker"},{"attributes":{"bottom_units":"screen","fill_alpha":{"value":0.5},"fill_color":{"value":"lightgrey"},"left_units":"screen","level":"overlay","line_alpha":{"value":1.0},"line_color":{"value":"black"},"line_dash":[4,4],"line_width":{"value":2},"plot":null,"render_mode":"css","right_units":"screen","top_units":"screen"},"id":"3ad465d3-b6da-492c-8cd4-26aaf4c83e47","type":"BoxAnnotation"},{"attributes":{"below":[{"id":"3ce89ec1-7d29-4907-b4df-130f816a5e76","type":"CategoricalAxis"}],"left":[{"id":"1d24660e-2f24-4a9e-9c11-972f85cee7e4","type":"LinearAxis"}],"renderers":[{"id":"3ad465d3-b6da-492c-8cd4-26aaf4c83e47","type":"BoxAnnotation"},{"id":"bbd4779a-7140-41f5-bf11-d97425c72a80","type":"GlyphRenderer"},{"id":"d5974ca7-c93f-43c0-b843-7076cb2131fd","type":"Legend"},{"id":"3ce89ec1-7d29-4907-b4df-130f816a5e76","type":"CategoricalAxis"},{"id":"1d24660e-2f24-4a9e-9c11-972f85cee7e4","type":"LinearAxis"},{"id":"c4039e11-3496-401f-b68e-27ac0a7bc8f4","type":"Grid"},{"id":"d9e28592-45bf-4244-a56c-87ce46c8dc3e","type":"Grid"}],"title":{"id":"9c98c893-1f67-42d3-ac34-d973ec48a020","type":"Title"},"tool_events":{"id":"84afbf63-4ae0-4c47-a9a7-e218e298dbe4","type":"ToolEvents"},"toolbar":{"id":"29c48f3a-6353-4e58-a235-8f15e8b49ca8","type":"Toolbar"},"x_mapper_type":"auto","x_range":{"id":"ae173f09-7a17-402d-acf0-d5b046e2ad4f","type":"FactorRange"},"y_mapper_type":"auto","y_range":{"id":"e98574a1-ae37-43c2-bc3a-6ec8ac26cc14","type":"Range1d"}},"id":"d410dc27-3837-46d3-aa9b-ed436d9baba1","subtype":"Chart","type":"Plot"},{"attributes":{"callback":null,"column_names":["x_values","y_values"],"data":{"chart_index":[null,null],"x_values":["S1","S2"],"y_values":[2000.0,2500.0]}},"id":"d7a7f849-54e0-449e-b43b-9456d2f66dc7","type":"ColumnDataSource"},{"attributes":{"plot":{"id":"d410dc27-3837-46d3-aa9b-ed436d9baba1","subtype":"Chart","type":"Plot"}},"id":"d5974ca7-c93f-43c0-b843-7076cb2131fd","type":"Legend"},{"attributes":{},"id":"e83da559-dfc8-4c33-aeb3-154ccc637da3","type":"CategoricalTickFormatter"},{"attributes":{},"id":"8b4ebf45-9a9d-486c-b932-77fd3523fd4f","type":"BasicTickFormatter"},{"attributes":{"overlay":{"id":"3ad465d3-b6da-492c-8cd4-26aaf4c83e47","type":"BoxAnnotation"},"plot":{"id":"d410dc27-3837-46d3-aa9b-ed436d9baba1","subtype":"Chart","type":"Plot"}},"id":"1451ca57-50c3-45c9-8135-5c7b400ed63c","type":"BoxZoomTool"},{"attributes":{"plot":{"id":"d410dc27-3837-46d3-aa9b-ed436d9baba1","subtype":"Chart","type":"Plot"}},"id":"52799108-26a2-40ed-8fed-8090f4e17c38","type":"SaveTool"},{"attributes":{"callback":null,"factors":["S1","S2"]},"id":"ae173f09-7a17-402d-acf0-d5b046e2ad4f","type":"FactorRange"},{"attributes":{},"id":"89333e89-4453-4df5-b77d-d300d6f7a6d4","type":"BasicTicker"},{"attributes":{"plot":null,"text":"Percent duplication per sample"},"id":"9c98c893-1f67-42d3-ac34-d973ec48a020","type":"Title"},{"attributes":{"plot":{"id":"d410dc27-3837-46d3-aa9b-ed436d9baba1","subtype":"Chart","type":"Plot"},"ticker":{"id":"31187afa-14db-4f04-9ff8-25cdbe795e3b","type":"CategoricalTicker"}},"id":"c4039e11-3496-401f-b68e-27ac0a7bc8f4","type":"Grid"},{"attributes":{"axis_label":"SM","formatter":{"id":"e83da559-dfc8-4c33-aeb3-154ccc637da3","type":"CategoricalTickFormatter"},"major_label_orientation":0.7853981633974483,"plot":{"id":"d410dc27-3837-46d3-aa9b-ed436d9baba1","subtype":"Chart","type":"Plot"},"ticker":{"id":"31187afa-14db-4f04-9ff8-25cdbe795e3b","type":"CategoricalTicker"}},"id":"3ce89ec1-7d29-4907-b4df-130f816a5e76","type":"CategoricalAxis"},{"attributes":{"axis_label":"PERCENT_DUPLICATION","formatter":{"id":"8b4ebf45-9a9d-486c-b932-77fd3523fd4f","type":"BasicTickFormatter"},"plot":{"id":"d410dc27-3837-46d3-aa9b-ed436d9baba1","subtype":"Chart","type":"Plot"},"ticker":{"id":"89333e89-4453-4df5-b77d-d300d6f7a6d4","type":"BasicTicker"}},"id":"1d24660e-2f24-4a9e-9c11-972f85cee7e4","type":"LinearAxis"},{"attributes":{"plot":{"id":"d410dc27-3837-46d3-aa9b-ed436d9baba1","subtype":"Chart","type":"Plot"}},"id":"c7fac8cb-a86f-4f6a-9ba7-9e1cfdcfa4e4","type":"WheelZoomTool"}],"root_ids":["d410dc27-3837-46d3-aa9b-ed436d9baba1"]},"title":"Bokeh Application","version":"0.12.3"}};
                  var render_items = [{"docid":"ef298dbe-786c-4c39-9d6e-6303dba84aee","elementid":"abcd8e0d-1ee6-4679-8fe6-8eb46d1265d3","modelid":"d410dc27-3837-46d3-aa9b-ed436d9baba1"}];
                  
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