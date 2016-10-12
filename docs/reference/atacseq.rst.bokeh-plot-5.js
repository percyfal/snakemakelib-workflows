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
      };var element = document.getElementById("8e341e70-9c0b-4fc9-a0fd-32a674964eda");
      if (element == null) {
        console.log("Bokeh: ERROR: autoload.js configured with elementid '8e341e70-9c0b-4fc9-a0fd-32a674964eda' but no matching script tag was found. ")
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
                  var docs_json = {"ac6be1e1-7f23-44e1-8cc3-89a7c6b446f9":{"roots":{"references":[{"attributes":{"plot":null,"text":"Percent duplication per sample"},"id":"40a511ba-7491-471e-9e6d-ee0c94a8a841","type":"Title"},{"attributes":{"plot":{"id":"90e4e83e-3df1-4c91-8c8b-e319b80207cb","subtype":"Chart","type":"Plot"}},"id":"498f2837-c7b5-4895-98f6-30a33da125fa","type":"SaveTool"},{"attributes":{"below":[{"id":"9ce48037-eadb-4841-990b-f71d65abd59b","type":"CategoricalAxis"}],"left":[{"id":"2dc40904-c25c-43bb-b7ad-b8e5cf3d27eb","type":"LinearAxis"}],"renderers":[{"id":"c985ef08-bbf2-4d7f-9f5a-d9d0d3cef750","type":"BoxAnnotation"},{"id":"e563f88c-317b-47da-a913-9aa5d2f9927f","type":"GlyphRenderer"},{"id":"688357a8-dfc8-4d2d-ba23-e44d93f13d20","type":"Legend"},{"id":"9ce48037-eadb-4841-990b-f71d65abd59b","type":"CategoricalAxis"},{"id":"2dc40904-c25c-43bb-b7ad-b8e5cf3d27eb","type":"LinearAxis"},{"id":"35532617-72b3-4438-b51c-a544858e51ce","type":"Grid"},{"id":"51f2683b-a4bd-4602-9083-96dba7fed5e6","type":"Grid"}],"title":{"id":"40a511ba-7491-471e-9e6d-ee0c94a8a841","type":"Title"},"tool_events":{"id":"2aa8e5d9-d9fa-42f9-aae3-c254206709b6","type":"ToolEvents"},"toolbar":{"id":"3f468461-fa6b-45f0-a724-e83d870ffc10","type":"Toolbar"},"x_mapper_type":"auto","x_range":{"id":"58aa1ac6-ef3c-488f-aea1-b50fb57398d3","type":"FactorRange"},"y_mapper_type":"auto","y_range":{"id":"1171b38f-2c2e-4599-a2eb-d38d9286e698","type":"Range1d"}},"id":"90e4e83e-3df1-4c91-8c8b-e319b80207cb","subtype":"Chart","type":"Plot"},{"attributes":{},"id":"cd5b1c41-7ab2-423d-9991-de6d013a68b9","type":"CategoricalTicker"},{"attributes":{"callback":null,"end":2550.0,"start":1950.0},"id":"1171b38f-2c2e-4599-a2eb-d38d9286e698","type":"Range1d"},{"attributes":{"bottom_units":"screen","fill_alpha":{"value":0.5},"fill_color":{"value":"lightgrey"},"left_units":"screen","level":"overlay","line_alpha":{"value":1.0},"line_color":{"value":"black"},"line_dash":[4,4],"line_width":{"value":2},"plot":null,"render_mode":"css","right_units":"screen","top_units":"screen"},"id":"c985ef08-bbf2-4d7f-9f5a-d9d0d3cef750","type":"BoxAnnotation"},{"attributes":{"axis_label":"PERCENT_DUPLICATION","formatter":{"id":"4ed81366-571f-4a4f-a5d3-697dae5bbd08","type":"BasicTickFormatter"},"plot":{"id":"90e4e83e-3df1-4c91-8c8b-e319b80207cb","subtype":"Chart","type":"Plot"},"ticker":{"id":"ea9bca86-0275-4d71-bb7c-f5625775dc40","type":"BasicTicker"}},"id":"2dc40904-c25c-43bb-b7ad-b8e5cf3d27eb","type":"LinearAxis"},{"attributes":{"overlay":{"id":"c985ef08-bbf2-4d7f-9f5a-d9d0d3cef750","type":"BoxAnnotation"},"plot":{"id":"90e4e83e-3df1-4c91-8c8b-e319b80207cb","subtype":"Chart","type":"Plot"}},"id":"72e7a86c-65c4-4b25-9c11-7e9a2dbaf881","type":"BoxZoomTool"},{"attributes":{"plot":{"id":"90e4e83e-3df1-4c91-8c8b-e319b80207cb","subtype":"Chart","type":"Plot"}},"id":"ea0b1dfc-5f5e-4510-9136-b4284f17264b","type":"ResetTool"},{"attributes":{"callback":null,"column_names":["y_values","x_values"],"data":{"chart_index":[null,null],"x_values":["S1","S2"],"y_values":[2000.0,2500.0]}},"id":"766a320f-51e0-494f-9749-9affbd97d7bb","type":"ColumnDataSource"},{"attributes":{"active_drag":"auto","active_scroll":"auto","active_tap":"auto","tools":[{"id":"cdd48f76-2849-4547-be47-5183b76800e0","type":"PanTool"},{"id":"128ac87c-7d56-41b9-8b8f-80669ca882d0","type":"WheelZoomTool"},{"id":"72e7a86c-65c4-4b25-9c11-7e9a2dbaf881","type":"BoxZoomTool"},{"id":"498f2837-c7b5-4895-98f6-30a33da125fa","type":"SaveTool"},{"id":"ea0b1dfc-5f5e-4510-9136-b4284f17264b","type":"ResetTool"},{"id":"50dd1f30-38f1-45e4-821a-9f528c2e8223","type":"HelpTool"}]},"id":"3f468461-fa6b-45f0-a724-e83d870ffc10","type":"Toolbar"},{"attributes":{},"id":"2aa8e5d9-d9fa-42f9-aae3-c254206709b6","type":"ToolEvents"},{"attributes":{"plot":{"id":"90e4e83e-3df1-4c91-8c8b-e319b80207cb","subtype":"Chart","type":"Plot"}},"id":"cdd48f76-2849-4547-be47-5183b76800e0","type":"PanTool"},{"attributes":{"plot":{"id":"90e4e83e-3df1-4c91-8c8b-e319b80207cb","subtype":"Chart","type":"Plot"}},"id":"50dd1f30-38f1-45e4-821a-9f528c2e8223","type":"HelpTool"},{"attributes":{"data_source":{"id":"766a320f-51e0-494f-9749-9affbd97d7bb","type":"ColumnDataSource"},"glyph":{"id":"974518e4-9978-45bd-b566-4ca4e1a44b68","type":"Circle"},"hover_glyph":null,"nonselection_glyph":null,"selection_glyph":null},"id":"e563f88c-317b-47da-a913-9aa5d2f9927f","type":"GlyphRenderer"},{"attributes":{},"id":"ea9bca86-0275-4d71-bb7c-f5625775dc40","type":"BasicTicker"},{"attributes":{"callback":null,"factors":["S1","S2"]},"id":"58aa1ac6-ef3c-488f-aea1-b50fb57398d3","type":"FactorRange"},{"attributes":{"axis_label":"SM","formatter":{"id":"9668636a-5097-47aa-a8fe-fb3a4d6c5794","type":"CategoricalTickFormatter"},"major_label_orientation":0.7853981633974483,"plot":{"id":"90e4e83e-3df1-4c91-8c8b-e319b80207cb","subtype":"Chart","type":"Plot"},"ticker":{"id":"cd5b1c41-7ab2-423d-9991-de6d013a68b9","type":"CategoricalTicker"}},"id":"9ce48037-eadb-4841-990b-f71d65abd59b","type":"CategoricalAxis"},{"attributes":{"plot":{"id":"90e4e83e-3df1-4c91-8c8b-e319b80207cb","subtype":"Chart","type":"Plot"},"ticker":{"id":"cd5b1c41-7ab2-423d-9991-de6d013a68b9","type":"CategoricalTicker"}},"id":"35532617-72b3-4438-b51c-a544858e51ce","type":"Grid"},{"attributes":{},"id":"9668636a-5097-47aa-a8fe-fb3a4d6c5794","type":"CategoricalTickFormatter"},{"attributes":{"dimension":1,"plot":{"id":"90e4e83e-3df1-4c91-8c8b-e319b80207cb","subtype":"Chart","type":"Plot"},"ticker":{"id":"ea9bca86-0275-4d71-bb7c-f5625775dc40","type":"BasicTicker"}},"id":"51f2683b-a4bd-4602-9083-96dba7fed5e6","type":"Grid"},{"attributes":{"plot":{"id":"90e4e83e-3df1-4c91-8c8b-e319b80207cb","subtype":"Chart","type":"Plot"}},"id":"128ac87c-7d56-41b9-8b8f-80669ca882d0","type":"WheelZoomTool"},{"attributes":{"plot":{"id":"90e4e83e-3df1-4c91-8c8b-e319b80207cb","subtype":"Chart","type":"Plot"}},"id":"688357a8-dfc8-4d2d-ba23-e44d93f13d20","type":"Legend"},{"attributes":{},"id":"4ed81366-571f-4a4f-a5d3-697dae5bbd08","type":"BasicTickFormatter"},{"attributes":{"fill_alpha":{"value":0.7},"fill_color":{"value":"#f22c40"},"line_color":{"value":"#f22c40"},"size":{"units":"screen","value":8},"x":{"field":"x_values"},"y":{"field":"y_values"}},"id":"974518e4-9978-45bd-b566-4ca4e1a44b68","type":"Circle"}],"root_ids":["90e4e83e-3df1-4c91-8c8b-e319b80207cb"]},"title":"Bokeh Application","version":"0.12.3"}};
                  var render_items = [{"docid":"ac6be1e1-7f23-44e1-8cc3-89a7c6b446f9","elementid":"8e341e70-9c0b-4fc9-a0fd-32a674964eda","modelid":"90e4e83e-3df1-4c91-8c8b-e319b80207cb"}];
                  
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