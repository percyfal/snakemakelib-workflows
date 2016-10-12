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
      };var element = document.getElementById("03c3c3ac-13b7-4de6-9f47-22dc9ff77789");
      if (element == null) {
        console.log("Bokeh: ERROR: autoload.js configured with elementid '03c3c3ac-13b7-4de6-9f47-22dc9ff77789' but no matching script tag was found. ")
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
                  var docs_json = {"29222087-3c8b-440f-b412-cc17c5a7b242":{"roots":{"references":[{"attributes":{"plot":{"id":"7695de86-1975-47e4-8b0a-b3d946c1591f","subtype":"Chart","type":"Plot"}},"id":"34a1de03-e96d-44dd-be63-d05d050ac906","type":"SaveTool"},{"attributes":{},"id":"80539f7a-3616-4e3e-83fa-5d5e037a7d41","type":"ToolEvents"},{"attributes":{"plot":{"id":"7695de86-1975-47e4-8b0a-b3d946c1591f","subtype":"Chart","type":"Plot"}},"id":"60335682-fa5e-47f3-9ad7-279f8a0f65f2","type":"HelpTool"},{"attributes":{"axis_label":"MEAN_INSERT_SIZE","formatter":{"id":"f768b097-a34f-447a-a6f8-3b744634612f","type":"BasicTickFormatter"},"plot":{"id":"7695de86-1975-47e4-8b0a-b3d946c1591f","subtype":"Chart","type":"Plot"},"ticker":{"id":"b8387655-493a-4dbc-911f-683b8f7a8c06","type":"BasicTicker"}},"id":"69c12354-f461-4b50-95d7-64a301338147","type":"LinearAxis"},{"attributes":{"label":{"value":"RF"},"renderers":[{"id":"f3822034-39e6-48bc-b9e8-d53fc3032308","type":"GlyphRenderer"}]},"id":"13249ec0-9ef7-4129-a445-25ae7039a620","type":"LegendItem"},{"attributes":{"label":{"value":"FR"},"renderers":[{"id":"a022088a-6352-468a-844d-fb75e64337df","type":"GlyphRenderer"}]},"id":"71813ed1-b68f-4d95-b358-6665f7cd7324","type":"LegendItem"},{"attributes":{"callback":null,"end":144.0,"start":96.0},"id":"65819ebd-0106-4130-a284-2c4db7eda11e","type":"Range1d"},{"attributes":{},"id":"f768b097-a34f-447a-a6f8-3b744634612f","type":"BasicTickFormatter"},{"attributes":{"data_source":{"id":"657a93e9-5690-473b-85b8-a60274b5918e","type":"ColumnDataSource"},"glyph":{"id":"15b46ba2-7d33-41ba-b84a-d70023a407b0","type":"Circle"},"hover_glyph":null,"nonselection_glyph":null,"selection_glyph":null},"id":"a022088a-6352-468a-844d-fb75e64337df","type":"GlyphRenderer"},{"attributes":{},"id":"a42e02df-9a43-4122-b6e9-d3b0211e9808","type":"CategoricalTickFormatter"},{"attributes":{"items":[{"id":"71813ed1-b68f-4d95-b358-6665f7cd7324","type":"LegendItem"},{"id":"13249ec0-9ef7-4129-a445-25ae7039a620","type":"LegendItem"}],"plot":{"id":"7695de86-1975-47e4-8b0a-b3d946c1591f","subtype":"Chart","type":"Plot"}},"id":"dab28138-3b14-432f-84bf-4393175d4a82","type":"Legend"},{"attributes":{"bottom_units":"screen","fill_alpha":{"value":0.5},"fill_color":{"value":"lightgrey"},"left_units":"screen","level":"overlay","line_alpha":{"value":1.0},"line_color":{"value":"black"},"line_dash":[4,4],"line_width":{"value":2},"plot":null,"render_mode":"css","right_units":"screen","top_units":"screen"},"id":"14a15564-05a2-4b89-9ae6-4248ce63c1af","type":"BoxAnnotation"},{"attributes":{"axis_label":"SM","formatter":{"id":"a42e02df-9a43-4122-b6e9-d3b0211e9808","type":"CategoricalTickFormatter"},"major_label_orientation":0.7853981633974483,"plot":{"id":"7695de86-1975-47e4-8b0a-b3d946c1591f","subtype":"Chart","type":"Plot"},"ticker":{"id":"8a5ef6e1-ffdf-4c44-af59-13986bff0690","type":"CategoricalTicker"}},"id":"9b233471-9700-42ef-8a48-b53538759b25","type":"CategoricalAxis"},{"attributes":{"overlay":{"id":"14a15564-05a2-4b89-9ae6-4248ce63c1af","type":"BoxAnnotation"},"plot":{"id":"7695de86-1975-47e4-8b0a-b3d946c1591f","subtype":"Chart","type":"Plot"}},"id":"32c9547d-0e86-4f24-9d66-366434d1e3a3","type":"BoxZoomTool"},{"attributes":{"plot":null,"text":"Mean insert size"},"id":"d1859bb8-cb3c-4268-88c6-0f9a94d11991","type":"Title"},{"attributes":{"fill_alpha":{"value":0.7},"fill_color":{"value":"#f22c40"},"line_color":{"value":"#f22c40"},"size":{"units":"screen","value":8},"x":{"field":"x_values"},"y":{"field":"y_values"}},"id":"15b46ba2-7d33-41ba-b84a-d70023a407b0","type":"Circle"},{"attributes":{"data_source":{"id":"ba0acd18-ea7f-4475-9461-a0d90f612bd6","type":"ColumnDataSource"},"glyph":{"id":"7d87eb9b-7ca2-420b-92ca-2f23d5d9667b","type":"Circle"},"hover_glyph":null,"nonselection_glyph":null,"selection_glyph":null},"id":"f3822034-39e6-48bc-b9e8-d53fc3032308","type":"GlyphRenderer"},{"attributes":{"dimension":1,"plot":{"id":"7695de86-1975-47e4-8b0a-b3d946c1591f","subtype":"Chart","type":"Plot"},"ticker":{"id":"b8387655-493a-4dbc-911f-683b8f7a8c06","type":"BasicTicker"}},"id":"028685b8-68e6-48ac-adab-bb6418a7338f","type":"Grid"},{"attributes":{"callback":null,"factors":["S1","S2"]},"id":"6a8e9ad5-6cb3-4ebf-a50c-d1338216c698","type":"FactorRange"},{"attributes":{},"id":"b8387655-493a-4dbc-911f-683b8f7a8c06","type":"BasicTicker"},{"attributes":{"fill_alpha":{"value":0.7},"fill_color":{"value":"#5ab738"},"line_color":{"value":"#5ab738"},"size":{"units":"screen","value":8},"x":{"field":"x_values"},"y":{"field":"y_values"}},"id":"7d87eb9b-7ca2-420b-92ca-2f23d5d9667b","type":"Circle"},{"attributes":{"plot":{"id":"7695de86-1975-47e4-8b0a-b3d946c1591f","subtype":"Chart","type":"Plot"}},"id":"d33c3828-32e2-48b1-88e5-2aa1308f913e","type":"ResetTool"},{"attributes":{"below":[{"id":"9b233471-9700-42ef-8a48-b53538759b25","type":"CategoricalAxis"}],"height":400,"left":[{"id":"69c12354-f461-4b50-95d7-64a301338147","type":"LinearAxis"}],"renderers":[{"id":"14a15564-05a2-4b89-9ae6-4248ce63c1af","type":"BoxAnnotation"},{"id":"a022088a-6352-468a-844d-fb75e64337df","type":"GlyphRenderer"},{"id":"f3822034-39e6-48bc-b9e8-d53fc3032308","type":"GlyphRenderer"},{"id":"dab28138-3b14-432f-84bf-4393175d4a82","type":"Legend"},{"id":"9b233471-9700-42ef-8a48-b53538759b25","type":"CategoricalAxis"},{"id":"69c12354-f461-4b50-95d7-64a301338147","type":"LinearAxis"},{"id":"45c00556-d0df-4f9e-a1ae-b35874f95365","type":"Grid"},{"id":"028685b8-68e6-48ac-adab-bb6418a7338f","type":"Grid"}],"title":{"id":"d1859bb8-cb3c-4268-88c6-0f9a94d11991","type":"Title"},"tool_events":{"id":"80539f7a-3616-4e3e-83fa-5d5e037a7d41","type":"ToolEvents"},"toolbar":{"id":"0df04e9e-b5e7-42ca-846f-36f6aade173d","type":"Toolbar"},"width":400,"x_mapper_type":"auto","x_range":{"id":"6a8e9ad5-6cb3-4ebf-a50c-d1338216c698","type":"FactorRange"},"y_mapper_type":"auto","y_range":{"id":"65819ebd-0106-4130-a284-2c4db7eda11e","type":"Range1d"}},"id":"7695de86-1975-47e4-8b0a-b3d946c1591f","subtype":"Chart","type":"Plot"},{"attributes":{},"id":"8a5ef6e1-ffdf-4c44-af59-13986bff0690","type":"CategoricalTicker"},{"attributes":{"plot":{"id":"7695de86-1975-47e4-8b0a-b3d946c1591f","subtype":"Chart","type":"Plot"},"ticker":{"id":"8a5ef6e1-ffdf-4c44-af59-13986bff0690","type":"CategoricalTicker"}},"id":"45c00556-d0df-4f9e-a1ae-b35874f95365","type":"Grid"},{"attributes":{"callback":null,"column_names":["x_values","y_values"],"data":{"PAIR_ORIENTATION":["RF","RF"],"chart_index":[{"PAIR_ORIENTATION":"RF"},{"PAIR_ORIENTATION":"RF"}],"x_values":["S1","S2"],"y_values":[100,120]}},"id":"ba0acd18-ea7f-4475-9461-a0d90f612bd6","type":"ColumnDataSource"},{"attributes":{"active_drag":"auto","active_scroll":"auto","active_tap":"auto","tools":[{"id":"d92c2300-e0ea-4559-ba51-2ce37729ef4b","type":"PanTool"},{"id":"fbff1a7a-1c05-4017-a4a4-e8c81388e21e","type":"WheelZoomTool"},{"id":"32c9547d-0e86-4f24-9d66-366434d1e3a3","type":"BoxZoomTool"},{"id":"34a1de03-e96d-44dd-be63-d05d050ac906","type":"SaveTool"},{"id":"d33c3828-32e2-48b1-88e5-2aa1308f913e","type":"ResetTool"},{"id":"60335682-fa5e-47f3-9ad7-279f8a0f65f2","type":"HelpTool"}]},"id":"0df04e9e-b5e7-42ca-846f-36f6aade173d","type":"Toolbar"},{"attributes":{"callback":null,"column_names":["x_values","y_values"],"data":{"PAIR_ORIENTATION":["FR","FR"],"chart_index":[{"PAIR_ORIENTATION":"FR"},{"PAIR_ORIENTATION":"FR"}],"x_values":["S1","S2"],"y_values":[120,140]}},"id":"657a93e9-5690-473b-85b8-a60274b5918e","type":"ColumnDataSource"},{"attributes":{"plot":{"id":"7695de86-1975-47e4-8b0a-b3d946c1591f","subtype":"Chart","type":"Plot"}},"id":"fbff1a7a-1c05-4017-a4a4-e8c81388e21e","type":"WheelZoomTool"},{"attributes":{"plot":{"id":"7695de86-1975-47e4-8b0a-b3d946c1591f","subtype":"Chart","type":"Plot"}},"id":"d92c2300-e0ea-4559-ba51-2ce37729ef4b","type":"PanTool"}],"root_ids":["7695de86-1975-47e4-8b0a-b3d946c1591f"]},"title":"Bokeh Application","version":"0.12.3"}};
                  var render_items = [{"docid":"29222087-3c8b-440f-b412-cc17c5a7b242","elementid":"03c3c3ac-13b7-4de6-9f47-22dc9ff77789","modelid":"7695de86-1975-47e4-8b0a-b3d946c1591f"}];
                  
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