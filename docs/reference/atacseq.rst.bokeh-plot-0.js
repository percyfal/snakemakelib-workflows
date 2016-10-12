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
      };var element = document.getElementById("116f8e25-cd57-4761-9f86-65718195664d");
      if (element == null) {
        console.log("Bokeh: ERROR: autoload.js configured with elementid '116f8e25-cd57-4761-9f86-65718195664d' but no matching script tag was found. ")
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
                  var docs_json = {"59073132-39fc-4029-b311-d3ea7657395c":{"roots":{"references":[{"attributes":{"label":{"value":"Read 1 percent"},"renderers":[{"id":"e66d9c51-c66e-43a5-ada4-0a8bce73abec","type":"GlyphRenderer"}]},"id":"5624a248-ad4e-42f2-84d7-52cb364fbcb9","type":"LegendItem"},{"attributes":{"below":[{"id":"54d61d1e-6d14-4794-af29-eead99ae48e3","type":"CategoricalAxis"}],"left":[{"id":"0787e1c5-cc8b-4f8e-91a3-ca96e23b92e2","type":"LinearAxis"}],"renderers":[{"id":"cbed8b94-ad3b-439d-8f70-e5b78978bf95","type":"BoxAnnotation"},{"id":"e66d9c51-c66e-43a5-ada4-0a8bce73abec","type":"GlyphRenderer"},{"id":"9051623c-93ee-48fc-8b00-7ff48b65f9aa","type":"Legend"},{"id":"54d61d1e-6d14-4794-af29-eead99ae48e3","type":"CategoricalAxis"},{"id":"0787e1c5-cc8b-4f8e-91a3-ca96e23b92e2","type":"LinearAxis"},{"id":"e5567a93-6289-4c8c-9ca3-68bebe6f00e5","type":"Grid"},{"id":"581cd356-b792-4893-a152-3326ab9130d4","type":"Grid"}],"title":{"id":"861fa6fc-4a5d-4b9e-89a8-be71dac38827","type":"Title"},"tool_events":{"id":"6ee3677e-7d6f-4d78-a931-85f394debfea","type":"ToolEvents"},"toolbar":{"id":"91b0b87e-5c57-4784-a1b2-c830621448db","type":"Toolbar"},"x_mapper_type":"auto","x_range":{"id":"215b43a3-b860-4091-8e0a-1a79ebada4b5","type":"FactorRange"},"y_mapper_type":"auto","y_range":{"id":"302092cd-12bd-42f0-9314-bd10e4f49356","type":"Range1d"}},"id":"39c22417-54ff-4cf7-954d-2a7b141ace7c","subtype":"Chart","type":"Plot"},{"attributes":{},"id":"c160f54a-a9ab-410d-8b0b-93049f004490","type":"BasicTickFormatter"},{"attributes":{"dimension":1,"plot":{"id":"39c22417-54ff-4cf7-954d-2a7b141ace7c","subtype":"Chart","type":"Plot"},"ticker":{"id":"0625694b-6c01-4e83-a9e7-b0b365978566","type":"BasicTicker"}},"id":"581cd356-b792-4893-a152-3326ab9130d4","type":"Grid"},{"attributes":{},"id":"0625694b-6c01-4e83-a9e7-b0b365978566","type":"BasicTicker"},{"attributes":{"plot":{"id":"39c22417-54ff-4cf7-954d-2a7b141ace7c","subtype":"Chart","type":"Plot"}},"id":"3af50519-6a01-4f84-8dcb-86e666dbee0b","type":"ResetTool"},{"attributes":{"plot":{"id":"39c22417-54ff-4cf7-954d-2a7b141ace7c","subtype":"Chart","type":"Plot"}},"id":"26099987-df3a-4738-ad14-9e7fc484086c","type":"HelpTool"},{"attributes":{"active_drag":"auto","active_scroll":"auto","active_tap":"auto","tools":[{"id":"75b0cdab-a70f-4878-adce-834c934a5437","type":"PanTool"},{"id":"08856e1a-92e7-4aee-80a8-8c36d4638fdf","type":"WheelZoomTool"},{"id":"2bb6390e-abb9-49e0-9cfa-4d495448568d","type":"BoxZoomTool"},{"id":"b66d7f24-ff30-4a3b-b13e-c7df01fa7c16","type":"SaveTool"},{"id":"3af50519-6a01-4f84-8dcb-86e666dbee0b","type":"ResetTool"},{"id":"26099987-df3a-4738-ad14-9e7fc484086c","type":"HelpTool"}]},"id":"91b0b87e-5c57-4784-a1b2-c830621448db","type":"Toolbar"},{"attributes":{"axis_label":"% reads with adapter","formatter":{"id":"c160f54a-a9ab-410d-8b0b-93049f004490","type":"BasicTickFormatter"},"plot":{"id":"39c22417-54ff-4cf7-954d-2a7b141ace7c","subtype":"Chart","type":"Plot"},"ticker":{"id":"0625694b-6c01-4e83-a9e7-b0b365978566","type":"BasicTicker"}},"id":"0787e1c5-cc8b-4f8e-91a3-ca96e23b92e2","type":"LinearAxis"},{"attributes":{"plot":{"id":"39c22417-54ff-4cf7-954d-2a7b141ace7c","subtype":"Chart","type":"Plot"}},"id":"75b0cdab-a70f-4878-adce-834c934a5437","type":"PanTool"},{"attributes":{"callback":null,"factors":["S1_P1","S1_P2"]},"id":"215b43a3-b860-4091-8e0a-1a79ebada4b5","type":"FactorRange"},{"attributes":{"items":[{"id":"5624a248-ad4e-42f2-84d7-52cb364fbcb9","type":"LegendItem"}],"plot":{"id":"39c22417-54ff-4cf7-954d-2a7b141ace7c","subtype":"Chart","type":"Plot"}},"id":"9051623c-93ee-48fc-8b00-7ff48b65f9aa","type":"Legend"},{"attributes":{"plot":{"id":"39c22417-54ff-4cf7-954d-2a7b141ace7c","subtype":"Chart","type":"Plot"}},"id":"08856e1a-92e7-4aee-80a8-8c36d4638fdf","type":"WheelZoomTool"},{"attributes":{},"id":"daaa0250-461b-49a2-8280-affd1eee6e5d","type":"CategoricalTicker"},{"attributes":{"plot":{"id":"39c22417-54ff-4cf7-954d-2a7b141ace7c","subtype":"Chart","type":"Plot"}},"id":"b66d7f24-ff30-4a3b-b13e-c7df01fa7c16","type":"SaveTool"},{"attributes":{},"id":"6ee3677e-7d6f-4d78-a931-85f394debfea","type":"ToolEvents"},{"attributes":{"callback":null,"column_names":["y_values","x_values"],"data":{"chart_index":[{"statistic":"Read 1 percent"},{"statistic":"Read 1 percent"}],"statistic":["Read 1 percent","Read 1 percent"],"x_values":["S1_P1","S1_P2"],"y_values":[80,40]}},"id":"c4d01fca-bf37-400a-aed7-5d39f6a61ae3","type":"ColumnDataSource"},{"attributes":{"data_source":{"id":"c4d01fca-bf37-400a-aed7-5d39f6a61ae3","type":"ColumnDataSource"},"glyph":{"id":"968d2487-55b9-4b36-9d58-6f7d278d7e4b","type":"Circle"},"hover_glyph":null,"nonselection_glyph":null,"selection_glyph":null},"id":"e66d9c51-c66e-43a5-ada4-0a8bce73abec","type":"GlyphRenderer"},{"attributes":{"fill_alpha":{"value":0.7},"fill_color":{"value":"#f22c40"},"line_color":{"value":"#f22c40"},"size":{"units":"screen","value":8},"x":{"field":"x_values"},"y":{"field":"y_values"}},"id":"968d2487-55b9-4b36-9d58-6f7d278d7e4b","type":"Circle"},{"attributes":{"axis_label":"PlatformUnit","formatter":{"id":"dbf26144-c9a2-45fb-9ba4-edbf1e9abc64","type":"CategoricalTickFormatter"},"major_label_orientation":0.7853981633974483,"plot":{"id":"39c22417-54ff-4cf7-954d-2a7b141ace7c","subtype":"Chart","type":"Plot"},"ticker":{"id":"daaa0250-461b-49a2-8280-affd1eee6e5d","type":"CategoricalTicker"}},"id":"54d61d1e-6d14-4794-af29-eead99ae48e3","type":"CategoricalAxis"},{"attributes":{"plot":{"id":"39c22417-54ff-4cf7-954d-2a7b141ace7c","subtype":"Chart","type":"Plot"},"ticker":{"id":"daaa0250-461b-49a2-8280-affd1eee6e5d","type":"CategoricalTicker"}},"id":"e5567a93-6289-4c8c-9ca3-68bebe6f00e5","type":"Grid"},{"attributes":{"callback":null,"end":84.0,"start":36.0},"id":"302092cd-12bd-42f0-9314-bd10e4f49356","type":"Range1d"},{"attributes":{"bottom_units":"screen","fill_alpha":{"value":0.5},"fill_color":{"value":"lightgrey"},"left_units":"screen","level":"overlay","line_alpha":{"value":1.0},"line_color":{"value":"black"},"line_dash":[4,4],"line_width":{"value":2},"plot":null,"render_mode":"css","right_units":"screen","top_units":"screen"},"id":"cbed8b94-ad3b-439d-8f70-e5b78978bf95","type":"BoxAnnotation"},{"attributes":{"overlay":{"id":"cbed8b94-ad3b-439d-8f70-e5b78978bf95","type":"BoxAnnotation"},"plot":{"id":"39c22417-54ff-4cf7-954d-2a7b141ace7c","subtype":"Chart","type":"Plot"}},"id":"2bb6390e-abb9-49e0-9cfa-4d495448568d","type":"BoxZoomTool"},{"attributes":{},"id":"dbf26144-c9a2-45fb-9ba4-edbf1e9abc64","type":"CategoricalTickFormatter"},{"attributes":{"plot":null,"text":"Cutadapt metrics"},"id":"861fa6fc-4a5d-4b9e-89a8-be71dac38827","type":"Title"}],"root_ids":["39c22417-54ff-4cf7-954d-2a7b141ace7c"]},"title":"Bokeh Application","version":"0.12.3"}};
                  var render_items = [{"docid":"59073132-39fc-4029-b311-d3ea7657395c","elementid":"116f8e25-cd57-4761-9f86-65718195664d","modelid":"39c22417-54ff-4cf7-954d-2a7b141ace7c"}];
                  
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