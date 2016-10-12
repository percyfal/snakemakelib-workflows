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
      };var element = document.getElementById("24b0f467-0dbc-4c1c-8d18-da333def7b79");
      if (element == null) {
        console.log("Bokeh: ERROR: autoload.js configured with elementid '24b0f467-0dbc-4c1c-8d18-da333def7b79' but no matching script tag was found. ")
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
                  var docs_json = {"a0ccf35a-e4bc-4435-9382-78c2cf408ce0":{"roots":{"references":[{"attributes":{"line_color":{"value":"#A6CEE3"},"line_width":{"value":2},"x":{"field":"BIN"},"y":{"field":"VALUE"}},"id":"9bfb5d2a-3918-4dd5-8a4a-62a4e3a1d424","type":"Line"},{"attributes":{"plot":{"id":"5f5416a2-d92b-4548-a3b9-8cab6132884e","subtype":"Figure","type":"Plot"}},"id":"57468e96-2f95-4eb7-a11d-196e916ae664","type":"PanTool"},{"attributes":{"bottom_units":"screen","fill_alpha":{"value":0.5},"fill_color":{"value":"lightgrey"},"left_units":"screen","level":"overlay","line_alpha":{"value":1.0},"line_color":{"value":"black"},"line_dash":[4,4],"line_width":{"value":2},"plot":null,"render_mode":"css","right_units":"screen","top_units":"screen"},"id":"3a1337a1-978b-493e-b6b6-4736288846d7","type":"BoxAnnotation"},{"attributes":{"data_source":{"id":"34f64fe1-37e8-4678-8f9e-e91a39e51d0f","type":"ColumnDataSource"},"glyph":{"id":"9bfb5d2a-3918-4dd5-8a4a-62a4e3a1d424","type":"Line"},"hover_glyph":null,"nonselection_glyph":{"id":"e1ab03c9-598b-4dad-b84a-2da84ef80e5b","type":"Line"},"selection_glyph":null},"id":"1e7cdef5-10ce-4536-ae1b-de1f58b70495","type":"GlyphRenderer"},{"attributes":{"line_alpha":{"value":0.1},"line_color":{"value":"#1f77b4"},"line_width":{"value":2},"x":{"field":"BIN"},"y":{"field":"VALUE"}},"id":"e1ab03c9-598b-4dad-b84a-2da84ef80e5b","type":"Line"},{"attributes":{"plot":{"id":"5f5416a2-d92b-4548-a3b9-8cab6132884e","subtype":"Figure","type":"Plot"}},"id":"33e5da78-1a18-489d-a514-c5919e99f87a","type":"SaveTool"},{"attributes":{"formatter":{"id":"e1c2d556-8eeb-4828-9756-9192093c6f9d","type":"BasicTickFormatter"},"plot":{"id":"5f5416a2-d92b-4548-a3b9-8cab6132884e","subtype":"Figure","type":"Plot"},"ticker":{"id":"ce322c2a-d3e7-46e6-817b-11e4e324dfe3","type":"BasicTicker"}},"id":"7265a6f5-b6a8-446d-8ae4-7018cf7ba753","type":"LinearAxis"},{"attributes":{"overlay":{"id":"3a1337a1-978b-493e-b6b6-4736288846d7","type":"BoxAnnotation"},"plot":{"id":"5f5416a2-d92b-4548-a3b9-8cab6132884e","subtype":"Figure","type":"Plot"}},"id":"590fa513-76f3-46c0-8ec2-de906da85e7d","type":"BoxZoomTool"},{"attributes":{"line_color":{"value":"#1F78B4"},"line_width":{"value":2},"x":{"field":"BIN"},"y":{"field":"VALUE"}},"id":"b19ed959-63e6-4445-9cd9-17831e2b955a","type":"Line"},{"attributes":{},"id":"f5027523-04d6-47d9-b831-7c53ca803ce9","type":"BasicTickFormatter"},{"attributes":{"line_alpha":{"value":0.1},"line_color":{"value":"#1f77b4"},"line_width":{"value":2},"x":{"field":"BIN"},"y":{"field":"VALUE"}},"id":"dea8548e-bf3a-43b6-b975-7524dcd83a7d","type":"Line"},{"attributes":{"plot":{"id":"5f5416a2-d92b-4548-a3b9-8cab6132884e","subtype":"Figure","type":"Plot"},"ticker":{"id":"ce322c2a-d3e7-46e6-817b-11e4e324dfe3","type":"BasicTicker"}},"id":"fc96d341-ac96-462d-b437-03604202efb9","type":"Grid"},{"attributes":{"plot":{"id":"5f5416a2-d92b-4548-a3b9-8cab6132884e","subtype":"Figure","type":"Plot"}},"id":"ab853ed3-5243-4561-a7ff-5e81474d3712","type":"WheelZoomTool"},{"attributes":{"callback":null},"id":"8cdb2a5d-89c5-412b-a39f-eba41114be30","type":"DataRange1d"},{"attributes":{"items":[{"id":"cec224f1-e3d1-4c83-a552-727458ae11bf","type":"LegendItem"},{"id":"5df0a8c6-dc50-4958-ac46-0bf0c984d687","type":"LegendItem"}],"plot":{"id":"5f5416a2-d92b-4548-a3b9-8cab6132884e","subtype":"Figure","type":"Plot"}},"id":"1787858c-ee3e-40f7-9acc-5d863b592eca","type":"Legend"},{"attributes":{"callback":null,"column_names":["VALUE","index","BIN","SM"],"data":{"BIN":[1.0,2.0],"SM":["S1","S1"],"VALUE":[1.5,2.8],"index":[0,1]}},"id":"a8a9fdb9-1516-4156-8b8a-162067e964c2","type":"ColumnDataSource"},{"attributes":{"dimension":1,"plot":{"id":"5f5416a2-d92b-4548-a3b9-8cab6132884e","subtype":"Figure","type":"Plot"},"ticker":{"id":"06e74941-ebe0-45a2-801e-c0703606774d","type":"BasicTicker"}},"id":"52053d2b-3cb3-439c-ba43-3a4270a3f256","type":"Grid"},{"attributes":{},"id":"e1c2d556-8eeb-4828-9756-9192093c6f9d","type":"BasicTickFormatter"},{"attributes":{"below":[{"id":"7265a6f5-b6a8-446d-8ae4-7018cf7ba753","type":"LinearAxis"}],"left":[{"id":"92e7a147-8877-4f36-999c-ea1112d1e444","type":"LinearAxis"}],"plot_height":200,"plot_width":200,"renderers":[{"id":"7265a6f5-b6a8-446d-8ae4-7018cf7ba753","type":"LinearAxis"},{"id":"fc96d341-ac96-462d-b437-03604202efb9","type":"Grid"},{"id":"92e7a147-8877-4f36-999c-ea1112d1e444","type":"LinearAxis"},{"id":"52053d2b-3cb3-439c-ba43-3a4270a3f256","type":"Grid"},{"id":"3a1337a1-978b-493e-b6b6-4736288846d7","type":"BoxAnnotation"},{"id":"1787858c-ee3e-40f7-9acc-5d863b592eca","type":"Legend"},{"id":"1e7cdef5-10ce-4536-ae1b-de1f58b70495","type":"GlyphRenderer"},{"id":"20b8445c-c2ee-41a8-a1d7-da3dc5b47aee","type":"GlyphRenderer"}],"title":{"id":"c06c4b1d-0f6d-4f3b-a044-8884093b3729","type":"Title"},"tool_events":{"id":"37a09dbc-7525-4290-9bc1-b9c1fc4a2b1a","type":"ToolEvents"},"toolbar":{"id":"0debc16b-0c22-45b2-ba9a-b5630579bbe5","type":"Toolbar"},"x_range":{"id":"8cdb2a5d-89c5-412b-a39f-eba41114be30","type":"DataRange1d"},"y_range":{"id":"d42c1e52-063e-4096-a747-7c5399e75f51","type":"DataRange1d"}},"id":"5f5416a2-d92b-4548-a3b9-8cab6132884e","subtype":"Figure","type":"Plot"},{"attributes":{"label":{"value":"S1"},"renderers":[{"id":"20b8445c-c2ee-41a8-a1d7-da3dc5b47aee","type":"GlyphRenderer"}]},"id":"5df0a8c6-dc50-4958-ac46-0bf0c984d687","type":"LegendItem"},{"attributes":{"formatter":{"id":"f5027523-04d6-47d9-b831-7c53ca803ce9","type":"BasicTickFormatter"},"plot":{"id":"5f5416a2-d92b-4548-a3b9-8cab6132884e","subtype":"Figure","type":"Plot"},"ticker":{"id":"06e74941-ebe0-45a2-801e-c0703606774d","type":"BasicTicker"}},"id":"92e7a147-8877-4f36-999c-ea1112d1e444","type":"LinearAxis"},{"attributes":{"callback":null,"column_names":["VALUE","index","BIN","SM"],"data":{"BIN":[1.0,2.0],"SM":["S2","S2"],"VALUE":[1.9,12.5],"index":[2,3]}},"id":"34f64fe1-37e8-4678-8f9e-e91a39e51d0f","type":"ColumnDataSource"},{"attributes":{"plot":{"id":"5f5416a2-d92b-4548-a3b9-8cab6132884e","subtype":"Figure","type":"Plot"}},"id":"c7031285-077b-41d3-a33b-877b09623197","type":"HelpTool"},{"attributes":{},"id":"37a09dbc-7525-4290-9bc1-b9c1fc4a2b1a","type":"ToolEvents"},{"attributes":{"active_drag":"auto","active_scroll":"auto","active_tap":"auto","tools":[{"id":"57468e96-2f95-4eb7-a11d-196e916ae664","type":"PanTool"},{"id":"ab853ed3-5243-4561-a7ff-5e81474d3712","type":"WheelZoomTool"},{"id":"590fa513-76f3-46c0-8ec2-de906da85e7d","type":"BoxZoomTool"},{"id":"33e5da78-1a18-489d-a514-c5919e99f87a","type":"SaveTool"},{"id":"a207479c-e779-4a8f-94f3-aacf45918028","type":"ResetTool"},{"id":"c7031285-077b-41d3-a33b-877b09623197","type":"HelpTool"}]},"id":"0debc16b-0c22-45b2-ba9a-b5630579bbe5","type":"Toolbar"},{"attributes":{},"id":"06e74941-ebe0-45a2-801e-c0703606774d","type":"BasicTicker"},{"attributes":{"data_source":{"id":"a8a9fdb9-1516-4156-8b8a-162067e964c2","type":"ColumnDataSource"},"glyph":{"id":"b19ed959-63e6-4445-9cd9-17831e2b955a","type":"Line"},"hover_glyph":null,"nonselection_glyph":{"id":"dea8548e-bf3a-43b6-b975-7524dcd83a7d","type":"Line"},"selection_glyph":null},"id":"20b8445c-c2ee-41a8-a1d7-da3dc5b47aee","type":"GlyphRenderer"},{"attributes":{"callback":null},"id":"d42c1e52-063e-4096-a747-7c5399e75f51","type":"DataRange1d"},{"attributes":{"plot":null,"text":"Return of investment"},"id":"c06c4b1d-0f6d-4f3b-a044-8884093b3729","type":"Title"},{"attributes":{"label":{"value":"S2"},"renderers":[{"id":"1e7cdef5-10ce-4536-ae1b-de1f58b70495","type":"GlyphRenderer"}]},"id":"cec224f1-e3d1-4c83-a552-727458ae11bf","type":"LegendItem"},{"attributes":{},"id":"ce322c2a-d3e7-46e6-817b-11e4e324dfe3","type":"BasicTicker"},{"attributes":{"plot":{"id":"5f5416a2-d92b-4548-a3b9-8cab6132884e","subtype":"Figure","type":"Plot"}},"id":"a207479c-e779-4a8f-94f3-aacf45918028","type":"ResetTool"}],"root_ids":["5f5416a2-d92b-4548-a3b9-8cab6132884e"]},"title":"Bokeh Application","version":"0.12.3"}};
                  var render_items = [{"docid":"a0ccf35a-e4bc-4435-9382-78c2cf408ce0","elementid":"24b0f467-0dbc-4c1c-8d18-da333def7b79","modelid":"5f5416a2-d92b-4548-a3b9-8cab6132884e"}];
                  
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