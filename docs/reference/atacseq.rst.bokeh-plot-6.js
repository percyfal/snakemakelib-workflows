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
      };var element = document.getElementById("5e0e05ac-7d07-4c46-a211-a217393596ae");
      if (element == null) {
        console.log("Bokeh: ERROR: autoload.js configured with elementid '5e0e05ac-7d07-4c46-a211-a217393596ae' but no matching script tag was found. ")
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
                  var docs_json = {"6cd27fec-3fcb-4b40-a259-a51e90d31be3":{"roots":{"references":[{"attributes":{"plot":{"id":"f7f0b35f-934e-44dd-8350-255fe050372b","subtype":"Figure","type":"Plot"}},"id":"25f1c346-7c69-4804-9313-24401effe7a1","type":"ResetTool"},{"attributes":{"bottom_units":"screen","fill_alpha":{"value":0.5},"fill_color":{"value":"lightgrey"},"left_units":"screen","level":"overlay","line_alpha":{"value":1.0},"line_color":{"value":"black"},"line_dash":[4,4],"line_width":{"value":2},"plot":null,"render_mode":"css","right_units":"screen","top_units":"screen"},"id":"27f2d5fa-b684-484d-8c80-b8eb4bd89fdb","type":"BoxAnnotation"},{"attributes":{"callback":null},"id":"f1a7e674-a32d-4101-8878-b2a72980f3dc","type":"DataRange1d"},{"attributes":{"plot":{"id":"f7f0b35f-934e-44dd-8350-255fe050372b","subtype":"Figure","type":"Plot"}},"id":"392e4ac8-bd29-4612-8708-467ac5392f5b","type":"HelpTool"},{"attributes":{"below":[{"id":"ba4ab3b1-eb4e-42ee-8e58-678a00bd482f","type":"LinearAxis"}],"left":[{"id":"ec7f61ec-953b-424f-923f-be6cee7d40bc","type":"LinearAxis"}],"plot_height":200,"plot_width":200,"renderers":[{"id":"ba4ab3b1-eb4e-42ee-8e58-678a00bd482f","type":"LinearAxis"},{"id":"26bfd69b-035a-48c1-841d-b8abe0449c2c","type":"Grid"},{"id":"ec7f61ec-953b-424f-923f-be6cee7d40bc","type":"LinearAxis"},{"id":"0d11e2d8-7b14-4823-936e-c21b80b264a0","type":"Grid"},{"id":"27f2d5fa-b684-484d-8c80-b8eb4bd89fdb","type":"BoxAnnotation"},{"id":"6e759401-a4b2-4104-92ec-4f11f5ac69d0","type":"Legend"},{"id":"ea445455-d448-4efc-bf27-a96288b1a8c9","type":"GlyphRenderer"},{"id":"ab16b5e0-6759-4238-9200-26407fa012f9","type":"GlyphRenderer"}],"title":{"id":"02ee04bd-b4a0-40fe-8c64-3a37a043162c","type":"Title"},"tool_events":{"id":"ad3bcfce-ac51-42e8-a94c-0593e17d0250","type":"ToolEvents"},"toolbar":{"id":"3ea0b6af-f915-4387-a423-9954c5a10e63","type":"Toolbar"},"x_range":{"id":"f1a7e674-a32d-4101-8878-b2a72980f3dc","type":"DataRange1d"},"y_range":{"id":"31c91e24-c2d6-48c1-84dc-ef4bbcf367fd","type":"DataRange1d"}},"id":"f7f0b35f-934e-44dd-8350-255fe050372b","subtype":"Figure","type":"Plot"},{"attributes":{},"id":"ad3bcfce-ac51-42e8-a94c-0593e17d0250","type":"ToolEvents"},{"attributes":{"items":[{"id":"a5eac639-e89a-4159-8358-f89dcf5fc2ee","type":"LegendItem"},{"id":"e2d5a733-a280-46ac-be69-87b7f5770ac4","type":"LegendItem"}],"plot":{"id":"f7f0b35f-934e-44dd-8350-255fe050372b","subtype":"Figure","type":"Plot"}},"id":"6e759401-a4b2-4104-92ec-4f11f5ac69d0","type":"Legend"},{"attributes":{"plot":{"id":"f7f0b35f-934e-44dd-8350-255fe050372b","subtype":"Figure","type":"Plot"}},"id":"636321ce-8439-4d61-935e-13c89ded18f0","type":"PanTool"},{"attributes":{"line_color":{"value":"#A6CEE3"},"line_width":{"value":2},"x":{"field":"BIN"},"y":{"field":"VALUE"}},"id":"348d734c-bbd4-4642-a913-bed3bc3c65d6","type":"Line"},{"attributes":{"line_color":{"value":"#1F78B4"},"line_width":{"value":2},"x":{"field":"BIN"},"y":{"field":"VALUE"}},"id":"9ad61da9-ce60-460b-a309-1fa7ba614846","type":"Line"},{"attributes":{"line_alpha":{"value":0.1},"line_color":{"value":"#1f77b4"},"line_width":{"value":2},"x":{"field":"BIN"},"y":{"field":"VALUE"}},"id":"ef7d1110-ffa4-4396-9b58-6389dbec59d0","type":"Line"},{"attributes":{"formatter":{"id":"cc3d1898-65ee-402e-978b-868092130eb8","type":"BasicTickFormatter"},"plot":{"id":"f7f0b35f-934e-44dd-8350-255fe050372b","subtype":"Figure","type":"Plot"},"ticker":{"id":"c9cb5129-7164-444c-81cd-c2c01484c046","type":"BasicTicker"}},"id":"ba4ab3b1-eb4e-42ee-8e58-678a00bd482f","type":"LinearAxis"},{"attributes":{"label":{"value":"S1"},"renderers":[{"id":"ea445455-d448-4efc-bf27-a96288b1a8c9","type":"GlyphRenderer"}]},"id":"a5eac639-e89a-4159-8358-f89dcf5fc2ee","type":"LegendItem"},{"attributes":{"callback":null,"column_names":["SM","BIN","index","VALUE"],"data":{"BIN":[1.0,2.0],"SM":["S2","S2"],"VALUE":[1.9,12.5],"index":[2,3]}},"id":"68e9c4f1-620f-4ebf-8f5a-9c63e2175ba8","type":"ColumnDataSource"},{"attributes":{"plot":null,"text":"Return of investment"},"id":"02ee04bd-b4a0-40fe-8c64-3a37a043162c","type":"Title"},{"attributes":{},"id":"cc3d1898-65ee-402e-978b-868092130eb8","type":"BasicTickFormatter"},{"attributes":{"overlay":{"id":"27f2d5fa-b684-484d-8c80-b8eb4bd89fdb","type":"BoxAnnotation"},"plot":{"id":"f7f0b35f-934e-44dd-8350-255fe050372b","subtype":"Figure","type":"Plot"}},"id":"3d8f3dc0-8c7d-4465-baf6-e361cdfbc975","type":"BoxZoomTool"},{"attributes":{"active_drag":"auto","active_scroll":"auto","active_tap":"auto","tools":[{"id":"636321ce-8439-4d61-935e-13c89ded18f0","type":"PanTool"},{"id":"affb391d-2426-413e-a23a-ddf16891d06c","type":"WheelZoomTool"},{"id":"3d8f3dc0-8c7d-4465-baf6-e361cdfbc975","type":"BoxZoomTool"},{"id":"a1f64fed-6edb-4040-bf0c-5038430c5044","type":"SaveTool"},{"id":"25f1c346-7c69-4804-9313-24401effe7a1","type":"ResetTool"},{"id":"392e4ac8-bd29-4612-8708-467ac5392f5b","type":"HelpTool"}]},"id":"3ea0b6af-f915-4387-a423-9954c5a10e63","type":"Toolbar"},{"attributes":{"callback":null},"id":"31c91e24-c2d6-48c1-84dc-ef4bbcf367fd","type":"DataRange1d"},{"attributes":{"plot":{"id":"f7f0b35f-934e-44dd-8350-255fe050372b","subtype":"Figure","type":"Plot"},"ticker":{"id":"c9cb5129-7164-444c-81cd-c2c01484c046","type":"BasicTicker"}},"id":"26bfd69b-035a-48c1-841d-b8abe0449c2c","type":"Grid"},{"attributes":{"data_source":{"id":"68e9c4f1-620f-4ebf-8f5a-9c63e2175ba8","type":"ColumnDataSource"},"glyph":{"id":"9ad61da9-ce60-460b-a309-1fa7ba614846","type":"Line"},"hover_glyph":null,"nonselection_glyph":{"id":"ef7d1110-ffa4-4396-9b58-6389dbec59d0","type":"Line"},"selection_glyph":null},"id":"ab16b5e0-6759-4238-9200-26407fa012f9","type":"GlyphRenderer"},{"attributes":{"plot":{"id":"f7f0b35f-934e-44dd-8350-255fe050372b","subtype":"Figure","type":"Plot"}},"id":"a1f64fed-6edb-4040-bf0c-5038430c5044","type":"SaveTool"},{"attributes":{"data_source":{"id":"6b818d12-5e64-43e5-98d5-9278f1a6876b","type":"ColumnDataSource"},"glyph":{"id":"348d734c-bbd4-4642-a913-bed3bc3c65d6","type":"Line"},"hover_glyph":null,"nonselection_glyph":{"id":"a22db5da-247d-4cc5-910b-8e5cbbe300ed","type":"Line"},"selection_glyph":null},"id":"ea445455-d448-4efc-bf27-a96288b1a8c9","type":"GlyphRenderer"},{"attributes":{"label":{"value":"S2"},"renderers":[{"id":"ab16b5e0-6759-4238-9200-26407fa012f9","type":"GlyphRenderer"}]},"id":"e2d5a733-a280-46ac-be69-87b7f5770ac4","type":"LegendItem"},{"attributes":{"formatter":{"id":"e19574fa-2695-4657-841b-109f74af9fa9","type":"BasicTickFormatter"},"plot":{"id":"f7f0b35f-934e-44dd-8350-255fe050372b","subtype":"Figure","type":"Plot"},"ticker":{"id":"8999524a-7f32-42ab-914f-22cab187f96d","type":"BasicTicker"}},"id":"ec7f61ec-953b-424f-923f-be6cee7d40bc","type":"LinearAxis"},{"attributes":{"line_alpha":{"value":0.1},"line_color":{"value":"#1f77b4"},"line_width":{"value":2},"x":{"field":"BIN"},"y":{"field":"VALUE"}},"id":"a22db5da-247d-4cc5-910b-8e5cbbe300ed","type":"Line"},{"attributes":{},"id":"c9cb5129-7164-444c-81cd-c2c01484c046","type":"BasicTicker"},{"attributes":{"plot":{"id":"f7f0b35f-934e-44dd-8350-255fe050372b","subtype":"Figure","type":"Plot"}},"id":"affb391d-2426-413e-a23a-ddf16891d06c","type":"WheelZoomTool"},{"attributes":{"dimension":1,"plot":{"id":"f7f0b35f-934e-44dd-8350-255fe050372b","subtype":"Figure","type":"Plot"},"ticker":{"id":"8999524a-7f32-42ab-914f-22cab187f96d","type":"BasicTicker"}},"id":"0d11e2d8-7b14-4823-936e-c21b80b264a0","type":"Grid"},{"attributes":{"callback":null,"column_names":["SM","BIN","index","VALUE"],"data":{"BIN":[1.0,2.0],"SM":["S1","S1"],"VALUE":[1.5,2.8],"index":[0,1]}},"id":"6b818d12-5e64-43e5-98d5-9278f1a6876b","type":"ColumnDataSource"},{"attributes":{},"id":"e19574fa-2695-4657-841b-109f74af9fa9","type":"BasicTickFormatter"},{"attributes":{},"id":"8999524a-7f32-42ab-914f-22cab187f96d","type":"BasicTicker"}],"root_ids":["f7f0b35f-934e-44dd-8350-255fe050372b"]},"title":"Bokeh Application","version":"0.12.3"}};
                  var render_items = [{"docid":"6cd27fec-3fcb-4b40-a259-a51e90d31be3","elementid":"5e0e05ac-7d07-4c46-a211-a217393596ae","modelid":"f7f0b35f-934e-44dd-8350-255fe050372b"}];
                  
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