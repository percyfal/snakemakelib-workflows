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
      };var element = document.getElementById("70a7d950-9703-4ff9-ac05-67130c04ecda");
      if (element == null) {
        console.log("Bokeh: ERROR: autoload.js configured with elementid '70a7d950-9703-4ff9-ac05-67130c04ecda' but no matching script tag was found. ")
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
                  var docs_json = {"58f26936-d3b4-4d25-a1d0-d81af2550446":{"roots":{"references":[{"attributes":{"data_source":{"id":"bf4b5073-6917-4db1-a73c-3a46e14cd00d","type":"ColumnDataSource"},"glyph":{"id":"f3eaa20a-87e5-4f0a-b228-717b4ffb850d","type":"Circle"},"hover_glyph":null,"nonselection_glyph":null,"selection_glyph":null},"id":"db3159cd-6a21-4362-ae47-2cf54d743664","type":"GlyphRenderer"},{"attributes":{"below":[{"id":"7d691c0d-074b-4224-82b2-3b4e3c4f05a8","type":"CategoricalAxis"}],"height":400,"left":[{"id":"2447535b-65e8-4c97-8fc9-a676553ac5dc","type":"LinearAxis"}],"renderers":[{"id":"e8f4af39-3720-44b7-8f28-79062fcdf649","type":"BoxAnnotation"},{"id":"db3159cd-6a21-4362-ae47-2cf54d743664","type":"GlyphRenderer"},{"id":"172d77eb-5712-48a8-9b43-e8e6c8ec04dd","type":"GlyphRenderer"},{"id":"706717a5-ad14-4896-920f-03ece172817f","type":"Legend"},{"id":"7d691c0d-074b-4224-82b2-3b4e3c4f05a8","type":"CategoricalAxis"},{"id":"2447535b-65e8-4c97-8fc9-a676553ac5dc","type":"LinearAxis"},{"id":"880e6b11-3ae9-4f3d-b80b-c3662e870d28","type":"Grid"},{"id":"ee7079a5-e825-42fb-a0af-46b6f4975185","type":"Grid"}],"title":{"id":"c3fcc46e-0a9f-42a8-87c2-01d678938fe2","type":"Title"},"tool_events":{"id":"7010b54f-a47c-4ed2-8427-4cd13a51702a","type":"ToolEvents"},"toolbar":{"id":"0b1689d5-85c0-4003-ba99-81669fce6622","type":"Toolbar"},"width":400,"x_mapper_type":"auto","x_range":{"id":"75282c2f-7719-4b8e-839a-dccd35921f0f","type":"FactorRange"},"y_mapper_type":"auto","y_range":{"id":"bce26d1a-b816-472c-9c39-a7aa5d23f986","type":"Range1d"}},"id":"a231ba62-f416-45b4-b8ee-839de08d5cf6","subtype":"Chart","type":"Plot"},{"attributes":{},"id":"afa8dcf0-fdba-45e8-8434-0db1f93f8605","type":"BasicTickFormatter"},{"attributes":{"plot":{"id":"a231ba62-f416-45b4-b8ee-839de08d5cf6","subtype":"Chart","type":"Plot"}},"id":"ec5b9038-f975-41a9-a2dc-d031a7f90d49","type":"ResetTool"},{"attributes":{"fill_alpha":{"value":0.7},"fill_color":{"value":"#f22c40"},"line_color":{"value":"#f22c40"},"size":{"units":"screen","value":8},"x":{"field":"x_values"},"y":{"field":"y_values"}},"id":"f3eaa20a-87e5-4f0a-b228-717b4ffb850d","type":"Circle"},{"attributes":{"data_source":{"id":"6f16b307-f8fe-4e5e-ac23-32c485ba894e","type":"ColumnDataSource"},"glyph":{"id":"eee97aa1-d12e-45ac-827c-650b6b593a97","type":"Circle"},"hover_glyph":null,"nonselection_glyph":null,"selection_glyph":null},"id":"172d77eb-5712-48a8-9b43-e8e6c8ec04dd","type":"GlyphRenderer"},{"attributes":{"callback":null,"factors":["S1","S2"]},"id":"75282c2f-7719-4b8e-839a-dccd35921f0f","type":"FactorRange"},{"attributes":{"axis_label":"SM","formatter":{"id":"15c19dbb-f9d2-4ce5-94e5-208011df2188","type":"CategoricalTickFormatter"},"major_label_orientation":0.7853981633974483,"plot":{"id":"a231ba62-f416-45b4-b8ee-839de08d5cf6","subtype":"Chart","type":"Plot"},"ticker":{"id":"9caace5f-bcdf-4483-8f6a-0cd6a5bb06bf","type":"CategoricalTicker"}},"id":"7d691c0d-074b-4224-82b2-3b4e3c4f05a8","type":"CategoricalAxis"},{"attributes":{"plot":null,"text":"Mean insert size"},"id":"c3fcc46e-0a9f-42a8-87c2-01d678938fe2","type":"Title"},{"attributes":{},"id":"bfaace67-af6a-40ac-866b-4b7e9b4358cd","type":"BasicTicker"},{"attributes":{"items":[{"id":"1c80b17f-b437-4436-b7bc-4e048b336a2e","type":"LegendItem"},{"id":"f9ee0ff6-7370-45f8-a142-2f3b6db68fe5","type":"LegendItem"}],"plot":{"id":"a231ba62-f416-45b4-b8ee-839de08d5cf6","subtype":"Chart","type":"Plot"}},"id":"706717a5-ad14-4896-920f-03ece172817f","type":"Legend"},{"attributes":{"bottom_units":"screen","fill_alpha":{"value":0.5},"fill_color":{"value":"lightgrey"},"left_units":"screen","level":"overlay","line_alpha":{"value":1.0},"line_color":{"value":"black"},"line_dash":[4,4],"line_width":{"value":2},"plot":null,"render_mode":"css","right_units":"screen","top_units":"screen"},"id":"e8f4af39-3720-44b7-8f28-79062fcdf649","type":"BoxAnnotation"},{"attributes":{"dimension":1,"plot":{"id":"a231ba62-f416-45b4-b8ee-839de08d5cf6","subtype":"Chart","type":"Plot"},"ticker":{"id":"bfaace67-af6a-40ac-866b-4b7e9b4358cd","type":"BasicTicker"}},"id":"ee7079a5-e825-42fb-a0af-46b6f4975185","type":"Grid"},{"attributes":{"plot":{"id":"a231ba62-f416-45b4-b8ee-839de08d5cf6","subtype":"Chart","type":"Plot"}},"id":"bb8ef7ba-23af-4026-9c5b-30022247a333","type":"PanTool"},{"attributes":{"plot":{"id":"a231ba62-f416-45b4-b8ee-839de08d5cf6","subtype":"Chart","type":"Plot"}},"id":"14db5547-1f60-44a2-871e-a5843797b050","type":"WheelZoomTool"},{"attributes":{"axis_label":"MEAN_INSERT_SIZE","formatter":{"id":"afa8dcf0-fdba-45e8-8434-0db1f93f8605","type":"BasicTickFormatter"},"plot":{"id":"a231ba62-f416-45b4-b8ee-839de08d5cf6","subtype":"Chart","type":"Plot"},"ticker":{"id":"bfaace67-af6a-40ac-866b-4b7e9b4358cd","type":"BasicTicker"}},"id":"2447535b-65e8-4c97-8fc9-a676553ac5dc","type":"LinearAxis"},{"attributes":{"active_drag":"auto","active_scroll":"auto","active_tap":"auto","tools":[{"id":"bb8ef7ba-23af-4026-9c5b-30022247a333","type":"PanTool"},{"id":"14db5547-1f60-44a2-871e-a5843797b050","type":"WheelZoomTool"},{"id":"1d93d4b8-20b3-48b0-87a2-db775e66704f","type":"BoxZoomTool"},{"id":"70ca1562-14df-409a-b261-9732ae7ed429","type":"SaveTool"},{"id":"ec5b9038-f975-41a9-a2dc-d031a7f90d49","type":"ResetTool"},{"id":"2ac15a2d-f9c7-45eb-8976-efbc2de57ce2","type":"HelpTool"}]},"id":"0b1689d5-85c0-4003-ba99-81669fce6622","type":"Toolbar"},{"attributes":{"callback":null,"end":144.0,"start":96.0},"id":"bce26d1a-b816-472c-9c39-a7aa5d23f986","type":"Range1d"},{"attributes":{"fill_alpha":{"value":0.7},"fill_color":{"value":"#5ab738"},"line_color":{"value":"#5ab738"},"size":{"units":"screen","value":8},"x":{"field":"x_values"},"y":{"field":"y_values"}},"id":"eee97aa1-d12e-45ac-827c-650b6b593a97","type":"Circle"},{"attributes":{"label":{"value":"RF"},"renderers":[{"id":"172d77eb-5712-48a8-9b43-e8e6c8ec04dd","type":"GlyphRenderer"}]},"id":"f9ee0ff6-7370-45f8-a142-2f3b6db68fe5","type":"LegendItem"},{"attributes":{"label":{"value":"FR"},"renderers":[{"id":"db3159cd-6a21-4362-ae47-2cf54d743664","type":"GlyphRenderer"}]},"id":"1c80b17f-b437-4436-b7bc-4e048b336a2e","type":"LegendItem"},{"attributes":{"plot":{"id":"a231ba62-f416-45b4-b8ee-839de08d5cf6","subtype":"Chart","type":"Plot"}},"id":"2ac15a2d-f9c7-45eb-8976-efbc2de57ce2","type":"HelpTool"},{"attributes":{"plot":{"id":"a231ba62-f416-45b4-b8ee-839de08d5cf6","subtype":"Chart","type":"Plot"},"ticker":{"id":"9caace5f-bcdf-4483-8f6a-0cd6a5bb06bf","type":"CategoricalTicker"}},"id":"880e6b11-3ae9-4f3d-b80b-c3662e870d28","type":"Grid"},{"attributes":{},"id":"15c19dbb-f9d2-4ce5-94e5-208011df2188","type":"CategoricalTickFormatter"},{"attributes":{"plot":{"id":"a231ba62-f416-45b4-b8ee-839de08d5cf6","subtype":"Chart","type":"Plot"}},"id":"70ca1562-14df-409a-b261-9732ae7ed429","type":"SaveTool"},{"attributes":{},"id":"7010b54f-a47c-4ed2-8427-4cd13a51702a","type":"ToolEvents"},{"attributes":{"callback":null,"column_names":["y_values","x_values"],"data":{"PAIR_ORIENTATION":["FR","FR"],"chart_index":[{"PAIR_ORIENTATION":"FR"},{"PAIR_ORIENTATION":"FR"}],"x_values":["S1","S2"],"y_values":[120,140]}},"id":"bf4b5073-6917-4db1-a73c-3a46e14cd00d","type":"ColumnDataSource"},{"attributes":{},"id":"9caace5f-bcdf-4483-8f6a-0cd6a5bb06bf","type":"CategoricalTicker"},{"attributes":{"callback":null,"column_names":["y_values","x_values"],"data":{"PAIR_ORIENTATION":["RF","RF"],"chart_index":[{"PAIR_ORIENTATION":"RF"},{"PAIR_ORIENTATION":"RF"}],"x_values":["S1","S2"],"y_values":[100,120]}},"id":"6f16b307-f8fe-4e5e-ac23-32c485ba894e","type":"ColumnDataSource"},{"attributes":{"overlay":{"id":"e8f4af39-3720-44b7-8f28-79062fcdf649","type":"BoxAnnotation"},"plot":{"id":"a231ba62-f416-45b4-b8ee-839de08d5cf6","subtype":"Chart","type":"Plot"}},"id":"1d93d4b8-20b3-48b0-87a2-db775e66704f","type":"BoxZoomTool"}],"root_ids":["a231ba62-f416-45b4-b8ee-839de08d5cf6"]},"title":"Bokeh Application","version":"0.12.3"}};
                  var render_items = [{"docid":"58f26936-d3b4-4d25-a1d0-d81af2550446","elementid":"70a7d950-9703-4ff9-ac05-67130c04ecda","modelid":"a231ba62-f416-45b4-b8ee-839de08d5cf6"}];
                  
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