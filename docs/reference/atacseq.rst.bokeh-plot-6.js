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
      };var element = document.getElementById("e9e5927d-e3fa-4d87-a68f-30520ac8663f");
      if (element == null) {
        console.log("Bokeh: ERROR: autoload.js configured with elementid 'e9e5927d-e3fa-4d87-a68f-30520ac8663f' but no matching script tag was found. ")
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
                  var docs_json = {"8d399344-a5bd-4811-92ef-acb1654635d4":{"roots":{"references":[{"attributes":{"line_color":{"value":"#1F78B4"},"line_width":{"value":2},"x":{"field":"BIN"},"y":{"field":"VALUE"}},"id":"03e3f443-5556-4d2a-b15b-bb3a6530a5e8","type":"Line"},{"attributes":{"callback":null,"column_names":["BIN","VALUE","index","SM"],"data":{"BIN":[1.0,2.0],"SM":["S1","S1"],"VALUE":[1.5,2.8],"index":[0,1]}},"id":"7287deef-b2b5-4753-93ea-6cedc4e21ed7","type":"ColumnDataSource"},{"attributes":{"line_alpha":{"value":0.1},"line_color":{"value":"#1f77b4"},"line_width":{"value":2},"x":{"field":"BIN"},"y":{"field":"VALUE"}},"id":"3842de09-8c79-4cb6-a295-e7571a2df0df","type":"Line"},{"attributes":{"callback":null},"id":"fab92086-8240-42c2-85f9-63a69fed5025","type":"DataRange1d"},{"attributes":{"active_drag":"auto","active_scroll":"auto","active_tap":"auto","tools":[{"id":"e9836015-d5c6-4bd4-af4f-6b162080c4e5","type":"PanTool"},{"id":"dae2bc0b-0533-40a7-bb24-05e3d7c96aa1","type":"WheelZoomTool"},{"id":"8df657f8-9f25-4497-8ab0-6532ad07c14c","type":"BoxZoomTool"},{"id":"d03f77a2-14e8-448d-8c91-ae7b3662ee48","type":"SaveTool"},{"id":"3a5b9150-1e1b-4336-9f0f-320472b8dd23","type":"ResetTool"},{"id":"1887ced0-acb3-444e-8d09-5c79d74c33dc","type":"HelpTool"}]},"id":"d2fff268-58e1-44e3-bba8-f10bfa7e77b7","type":"Toolbar"},{"attributes":{"data_source":{"id":"81f76057-f2fd-4b6b-a163-28ad41bfe0b8","type":"ColumnDataSource"},"glyph":{"id":"5c6d3708-7c1c-47b8-ad2a-5970c855a43b","type":"Line"},"hover_glyph":null,"nonselection_glyph":{"id":"a2c51452-68d7-4311-a35e-766eeaf34487","type":"Line"},"selection_glyph":null},"id":"17feb1bf-abd3-4f31-b4d2-8e4d4096ad99","type":"GlyphRenderer"},{"attributes":{"line_color":{"value":"#A6CEE3"},"line_width":{"value":2},"x":{"field":"BIN"},"y":{"field":"VALUE"}},"id":"5c6d3708-7c1c-47b8-ad2a-5970c855a43b","type":"Line"},{"attributes":{"overlay":{"id":"e20c8fb4-7fb6-4749-853e-82dc5503132a","type":"BoxAnnotation"},"plot":{"id":"f27b2f1a-1673-4ddd-abce-8b9e53f7b749","subtype":"Figure","type":"Plot"}},"id":"8df657f8-9f25-4497-8ab0-6532ad07c14c","type":"BoxZoomTool"},{"attributes":{"plot":{"id":"f27b2f1a-1673-4ddd-abce-8b9e53f7b749","subtype":"Figure","type":"Plot"}},"id":"e9836015-d5c6-4bd4-af4f-6b162080c4e5","type":"PanTool"},{"attributes":{"plot":{"id":"f27b2f1a-1673-4ddd-abce-8b9e53f7b749","subtype":"Figure","type":"Plot"}},"id":"1887ced0-acb3-444e-8d09-5c79d74c33dc","type":"HelpTool"},{"attributes":{"plot":null,"text":"Return of investment"},"id":"4fcf47a2-83a6-48b2-b08f-894acb3f7ee0","type":"Title"},{"attributes":{"below":[{"id":"7a35d7dc-57b6-437a-bacd-b41d84242357","type":"LinearAxis"}],"left":[{"id":"f3473b0f-2343-44c3-a897-7d7cedac9c90","type":"LinearAxis"}],"plot_height":200,"plot_width":200,"renderers":[{"id":"7a35d7dc-57b6-437a-bacd-b41d84242357","type":"LinearAxis"},{"id":"237a9b10-58c4-4c60-9271-1dd30e604222","type":"Grid"},{"id":"f3473b0f-2343-44c3-a897-7d7cedac9c90","type":"LinearAxis"},{"id":"f1fec7ca-924d-41fd-bcf1-2019f2195407","type":"Grid"},{"id":"e20c8fb4-7fb6-4749-853e-82dc5503132a","type":"BoxAnnotation"},{"id":"4b221bb3-141e-4133-bfa8-64fe7891d38b","type":"Legend"},{"id":"17feb1bf-abd3-4f31-b4d2-8e4d4096ad99","type":"GlyphRenderer"},{"id":"59b29926-b931-4289-9f9b-56bf6f9377dc","type":"GlyphRenderer"}],"title":{"id":"4fcf47a2-83a6-48b2-b08f-894acb3f7ee0","type":"Title"},"tool_events":{"id":"6160ac43-b1c4-45bd-a5a5-21afe8742633","type":"ToolEvents"},"toolbar":{"id":"d2fff268-58e1-44e3-bba8-f10bfa7e77b7","type":"Toolbar"},"x_range":{"id":"b214ab87-4034-4cca-8da1-a66ba5c4febf","type":"DataRange1d"},"y_range":{"id":"fab92086-8240-42c2-85f9-63a69fed5025","type":"DataRange1d"}},"id":"f27b2f1a-1673-4ddd-abce-8b9e53f7b749","subtype":"Figure","type":"Plot"},{"attributes":{"plot":{"id":"f27b2f1a-1673-4ddd-abce-8b9e53f7b749","subtype":"Figure","type":"Plot"}},"id":"d03f77a2-14e8-448d-8c91-ae7b3662ee48","type":"SaveTool"},{"attributes":{},"id":"f24ddd26-900d-47d7-981f-9987810fbb58","type":"BasicTickFormatter"},{"attributes":{},"id":"6160ac43-b1c4-45bd-a5a5-21afe8742633","type":"ToolEvents"},{"attributes":{"formatter":{"id":"f24ddd26-900d-47d7-981f-9987810fbb58","type":"BasicTickFormatter"},"plot":{"id":"f27b2f1a-1673-4ddd-abce-8b9e53f7b749","subtype":"Figure","type":"Plot"},"ticker":{"id":"ad3a0a97-8284-47bd-b800-2fe23c17a14d","type":"BasicTicker"}},"id":"7a35d7dc-57b6-437a-bacd-b41d84242357","type":"LinearAxis"},{"attributes":{"callback":null},"id":"b214ab87-4034-4cca-8da1-a66ba5c4febf","type":"DataRange1d"},{"attributes":{"formatter":{"id":"c30f5fc2-0f7a-4ba6-95d2-9b27992984e6","type":"BasicTickFormatter"},"plot":{"id":"f27b2f1a-1673-4ddd-abce-8b9e53f7b749","subtype":"Figure","type":"Plot"},"ticker":{"id":"4c4c375f-6af3-468f-9c97-cbbcf6f75413","type":"BasicTicker"}},"id":"f3473b0f-2343-44c3-a897-7d7cedac9c90","type":"LinearAxis"},{"attributes":{"data_source":{"id":"7287deef-b2b5-4753-93ea-6cedc4e21ed7","type":"ColumnDataSource"},"glyph":{"id":"03e3f443-5556-4d2a-b15b-bb3a6530a5e8","type":"Line"},"hover_glyph":null,"nonselection_glyph":{"id":"3842de09-8c79-4cb6-a295-e7571a2df0df","type":"Line"},"selection_glyph":null},"id":"59b29926-b931-4289-9f9b-56bf6f9377dc","type":"GlyphRenderer"},{"attributes":{},"id":"c30f5fc2-0f7a-4ba6-95d2-9b27992984e6","type":"BasicTickFormatter"},{"attributes":{"plot":{"id":"f27b2f1a-1673-4ddd-abce-8b9e53f7b749","subtype":"Figure","type":"Plot"},"ticker":{"id":"ad3a0a97-8284-47bd-b800-2fe23c17a14d","type":"BasicTicker"}},"id":"237a9b10-58c4-4c60-9271-1dd30e604222","type":"Grid"},{"attributes":{},"id":"4c4c375f-6af3-468f-9c97-cbbcf6f75413","type":"BasicTicker"},{"attributes":{"plot":{"id":"f27b2f1a-1673-4ddd-abce-8b9e53f7b749","subtype":"Figure","type":"Plot"}},"id":"3a5b9150-1e1b-4336-9f0f-320472b8dd23","type":"ResetTool"},{"attributes":{"callback":null,"column_names":["BIN","VALUE","index","SM"],"data":{"BIN":[1.0,2.0],"SM":["S2","S2"],"VALUE":[1.9,12.5],"index":[2,3]}},"id":"81f76057-f2fd-4b6b-a163-28ad41bfe0b8","type":"ColumnDataSource"},{"attributes":{"dimension":1,"plot":{"id":"f27b2f1a-1673-4ddd-abce-8b9e53f7b749","subtype":"Figure","type":"Plot"},"ticker":{"id":"4c4c375f-6af3-468f-9c97-cbbcf6f75413","type":"BasicTicker"}},"id":"f1fec7ca-924d-41fd-bcf1-2019f2195407","type":"Grid"},{"attributes":{"plot":{"id":"f27b2f1a-1673-4ddd-abce-8b9e53f7b749","subtype":"Figure","type":"Plot"}},"id":"dae2bc0b-0533-40a7-bb24-05e3d7c96aa1","type":"WheelZoomTool"},{"attributes":{},"id":"ad3a0a97-8284-47bd-b800-2fe23c17a14d","type":"BasicTicker"},{"attributes":{"label":{"value":"S2"},"renderers":[{"id":"17feb1bf-abd3-4f31-b4d2-8e4d4096ad99","type":"GlyphRenderer"}]},"id":"b4cda06f-a089-4fae-8b09-ecfa8de21458","type":"LegendItem"},{"attributes":{"label":{"value":"S1"},"renderers":[{"id":"59b29926-b931-4289-9f9b-56bf6f9377dc","type":"GlyphRenderer"}]},"id":"bcff19d2-0fbc-4df4-a909-fb2493d0e498","type":"LegendItem"},{"attributes":{"line_alpha":{"value":0.1},"line_color":{"value":"#1f77b4"},"line_width":{"value":2},"x":{"field":"BIN"},"y":{"field":"VALUE"}},"id":"a2c51452-68d7-4311-a35e-766eeaf34487","type":"Line"},{"attributes":{"bottom_units":"screen","fill_alpha":{"value":0.5},"fill_color":{"value":"lightgrey"},"left_units":"screen","level":"overlay","line_alpha":{"value":1.0},"line_color":{"value":"black"},"line_dash":[4,4],"line_width":{"value":2},"plot":null,"render_mode":"css","right_units":"screen","top_units":"screen"},"id":"e20c8fb4-7fb6-4749-853e-82dc5503132a","type":"BoxAnnotation"},{"attributes":{"items":[{"id":"b4cda06f-a089-4fae-8b09-ecfa8de21458","type":"LegendItem"},{"id":"bcff19d2-0fbc-4df4-a909-fb2493d0e498","type":"LegendItem"}],"plot":{"id":"f27b2f1a-1673-4ddd-abce-8b9e53f7b749","subtype":"Figure","type":"Plot"}},"id":"4b221bb3-141e-4133-bfa8-64fe7891d38b","type":"Legend"}],"root_ids":["f27b2f1a-1673-4ddd-abce-8b9e53f7b749"]},"title":"Bokeh Application","version":"0.12.3"}};
                  var render_items = [{"docid":"8d399344-a5bd-4811-92ef-acb1654635d4","elementid":"e9e5927d-e3fa-4d87-a68f-30520ac8663f","modelid":"f27b2f1a-1673-4ddd-abce-8b9e53f7b749"}];
                  
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