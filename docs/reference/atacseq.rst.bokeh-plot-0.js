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
      };var element = document.getElementById("68bb994b-7152-4beb-be77-a9b4fbab0701");
      if (element == null) {
        console.log("Bokeh: ERROR: autoload.js configured with elementid '68bb994b-7152-4beb-be77-a9b4fbab0701' but no matching script tag was found. ")
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
                  var docs_json = {"09d4de7f-84ff-4c3e-a994-0a384c706118":{"roots":{"references":[{"attributes":{"plot":null,"text":"Cutadapt metrics"},"id":"be22860d-38b4-451a-8d4a-f5626b8f2318","type":"Title"},{"attributes":{"plot":{"id":"51411968-63b8-480f-aa0d-b2a6295d85d6","subtype":"Chart","type":"Plot"},"ticker":{"id":"33d52dc6-2110-46de-afdb-ee134e347f28","type":"CategoricalTicker"}},"id":"9ddb26a5-7c3b-4f16-8841-b9a088c42292","type":"Grid"},{"attributes":{"overlay":{"id":"b1df7278-e6ff-4572-9a1c-bedee8095df9","type":"BoxAnnotation"},"plot":{"id":"51411968-63b8-480f-aa0d-b2a6295d85d6","subtype":"Chart","type":"Plot"}},"id":"31274b4c-5734-4299-863d-287aa9ca2964","type":"BoxZoomTool"},{"attributes":{"data_source":{"id":"c02f1d8d-f675-44a8-85e1-77af2eacaf53","type":"ColumnDataSource"},"glyph":{"id":"1ec0e38f-1770-4fea-aebf-431505647121","type":"Circle"},"hover_glyph":null,"nonselection_glyph":null,"selection_glyph":null},"id":"8770809b-47ec-4a07-b85c-8021154dd458","type":"GlyphRenderer"},{"attributes":{"plot":{"id":"51411968-63b8-480f-aa0d-b2a6295d85d6","subtype":"Chart","type":"Plot"}},"id":"6d87f3bd-78e2-4a1d-a7db-317839cb1cc0","type":"ResetTool"},{"attributes":{"dimension":1,"plot":{"id":"51411968-63b8-480f-aa0d-b2a6295d85d6","subtype":"Chart","type":"Plot"},"ticker":{"id":"b0a54e7e-f6a0-4022-a074-97dfd8d8e6c0","type":"BasicTicker"}},"id":"4e0ffcc0-73bd-43ce-a98c-6f3851f3355b","type":"Grid"},{"attributes":{"axis_label":"PlatformUnit","formatter":{"id":"dd8e90f4-3e56-4e78-8c08-e5d6972c32e4","type":"CategoricalTickFormatter"},"major_label_orientation":0.7853981633974483,"plot":{"id":"51411968-63b8-480f-aa0d-b2a6295d85d6","subtype":"Chart","type":"Plot"},"ticker":{"id":"33d52dc6-2110-46de-afdb-ee134e347f28","type":"CategoricalTicker"}},"id":"c125f55d-6b5b-4d2a-9197-441e95d54287","type":"CategoricalAxis"},{"attributes":{},"id":"dd8e90f4-3e56-4e78-8c08-e5d6972c32e4","type":"CategoricalTickFormatter"},{"attributes":{},"id":"b0a54e7e-f6a0-4022-a074-97dfd8d8e6c0","type":"BasicTicker"},{"attributes":{"plot":{"id":"51411968-63b8-480f-aa0d-b2a6295d85d6","subtype":"Chart","type":"Plot"}},"id":"9dea365a-fb69-4b49-94f5-ea83ddb9ed0f","type":"SaveTool"},{"attributes":{},"id":"5ee8b7f1-accd-489d-a32c-416e2a65a4a5","type":"ToolEvents"},{"attributes":{"below":[{"id":"c125f55d-6b5b-4d2a-9197-441e95d54287","type":"CategoricalAxis"}],"left":[{"id":"44a8a3fc-ce5e-48be-9567-b0f7abe4381c","type":"LinearAxis"}],"renderers":[{"id":"b1df7278-e6ff-4572-9a1c-bedee8095df9","type":"BoxAnnotation"},{"id":"8770809b-47ec-4a07-b85c-8021154dd458","type":"GlyphRenderer"},{"id":"f0af4e8e-b1e5-4e78-b154-abe54ded8fd9","type":"Legend"},{"id":"c125f55d-6b5b-4d2a-9197-441e95d54287","type":"CategoricalAxis"},{"id":"44a8a3fc-ce5e-48be-9567-b0f7abe4381c","type":"LinearAxis"},{"id":"9ddb26a5-7c3b-4f16-8841-b9a088c42292","type":"Grid"},{"id":"4e0ffcc0-73bd-43ce-a98c-6f3851f3355b","type":"Grid"}],"title":{"id":"be22860d-38b4-451a-8d4a-f5626b8f2318","type":"Title"},"tool_events":{"id":"5ee8b7f1-accd-489d-a32c-416e2a65a4a5","type":"ToolEvents"},"toolbar":{"id":"b0e8425e-04dc-4e19-9cdb-737d5ac09636","type":"Toolbar"},"x_mapper_type":"auto","x_range":{"id":"f62a1ba3-e86e-4833-9fb1-a72753a0bbf2","type":"FactorRange"},"y_mapper_type":"auto","y_range":{"id":"f349ef0b-9317-4795-868a-c9a71e040c59","type":"Range1d"}},"id":"51411968-63b8-480f-aa0d-b2a6295d85d6","subtype":"Chart","type":"Plot"},{"attributes":{"callback":null,"column_names":["x_values","y_values"],"data":{"chart_index":[{"statistic":"Read 1 percent"},{"statistic":"Read 1 percent"}],"statistic":["Read 1 percent","Read 1 percent"],"x_values":["S1_P1","S1_P2"],"y_values":[80,40]}},"id":"c02f1d8d-f675-44a8-85e1-77af2eacaf53","type":"ColumnDataSource"},{"attributes":{"callback":null,"factors":["S1_P1","S1_P2"]},"id":"f62a1ba3-e86e-4833-9fb1-a72753a0bbf2","type":"FactorRange"},{"attributes":{"plot":{"id":"51411968-63b8-480f-aa0d-b2a6295d85d6","subtype":"Chart","type":"Plot"}},"id":"88e8a01b-f596-47a3-a969-fb194e608b53","type":"HelpTool"},{"attributes":{},"id":"33d52dc6-2110-46de-afdb-ee134e347f28","type":"CategoricalTicker"},{"attributes":{"active_drag":"auto","active_scroll":"auto","active_tap":"auto","tools":[{"id":"686e14f0-5930-49d9-be7d-0c6b99387937","type":"PanTool"},{"id":"9030ace4-49f3-4a90-8a41-4518ccb50273","type":"WheelZoomTool"},{"id":"31274b4c-5734-4299-863d-287aa9ca2964","type":"BoxZoomTool"},{"id":"9dea365a-fb69-4b49-94f5-ea83ddb9ed0f","type":"SaveTool"},{"id":"6d87f3bd-78e2-4a1d-a7db-317839cb1cc0","type":"ResetTool"},{"id":"88e8a01b-f596-47a3-a969-fb194e608b53","type":"HelpTool"}]},"id":"b0e8425e-04dc-4e19-9cdb-737d5ac09636","type":"Toolbar"},{"attributes":{},"id":"3f4bb6ad-35aa-4b69-91e6-6003cfeca55f","type":"BasicTickFormatter"},{"attributes":{"axis_label":"% reads with adapter","formatter":{"id":"3f4bb6ad-35aa-4b69-91e6-6003cfeca55f","type":"BasicTickFormatter"},"plot":{"id":"51411968-63b8-480f-aa0d-b2a6295d85d6","subtype":"Chart","type":"Plot"},"ticker":{"id":"b0a54e7e-f6a0-4022-a074-97dfd8d8e6c0","type":"BasicTicker"}},"id":"44a8a3fc-ce5e-48be-9567-b0f7abe4381c","type":"LinearAxis"},{"attributes":{"plot":{"id":"51411968-63b8-480f-aa0d-b2a6295d85d6","subtype":"Chart","type":"Plot"}},"id":"686e14f0-5930-49d9-be7d-0c6b99387937","type":"PanTool"},{"attributes":{"items":[{"id":"34e65305-dfed-4441-ba58-ded3834d7f2e","type":"LegendItem"}],"plot":{"id":"51411968-63b8-480f-aa0d-b2a6295d85d6","subtype":"Chart","type":"Plot"}},"id":"f0af4e8e-b1e5-4e78-b154-abe54ded8fd9","type":"Legend"},{"attributes":{"bottom_units":"screen","fill_alpha":{"value":0.5},"fill_color":{"value":"lightgrey"},"left_units":"screen","level":"overlay","line_alpha":{"value":1.0},"line_color":{"value":"black"},"line_dash":[4,4],"line_width":{"value":2},"plot":null,"render_mode":"css","right_units":"screen","top_units":"screen"},"id":"b1df7278-e6ff-4572-9a1c-bedee8095df9","type":"BoxAnnotation"},{"attributes":{"fill_alpha":{"value":0.7},"fill_color":{"value":"#f22c40"},"line_color":{"value":"#f22c40"},"size":{"units":"screen","value":8},"x":{"field":"x_values"},"y":{"field":"y_values"}},"id":"1ec0e38f-1770-4fea-aebf-431505647121","type":"Circle"},{"attributes":{"callback":null,"end":84.0,"start":36.0},"id":"f349ef0b-9317-4795-868a-c9a71e040c59","type":"Range1d"},{"attributes":{"plot":{"id":"51411968-63b8-480f-aa0d-b2a6295d85d6","subtype":"Chart","type":"Plot"}},"id":"9030ace4-49f3-4a90-8a41-4518ccb50273","type":"WheelZoomTool"},{"attributes":{"label":{"value":"Read 1 percent"},"renderers":[{"id":"8770809b-47ec-4a07-b85c-8021154dd458","type":"GlyphRenderer"}]},"id":"34e65305-dfed-4441-ba58-ded3834d7f2e","type":"LegendItem"}],"root_ids":["51411968-63b8-480f-aa0d-b2a6295d85d6"]},"title":"Bokeh Application","version":"0.12.3"}};
                  var render_items = [{"docid":"09d4de7f-84ff-4c3e-a994-0a384c706118","elementid":"68bb994b-7152-4beb-be77-a9b4fbab0701","modelid":"51411968-63b8-480f-aa0d-b2a6295d85d6"}];
                  
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