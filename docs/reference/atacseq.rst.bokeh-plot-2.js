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
      };var element = document.getElementById("e2ff64f7-cc10-4c63-ae55-03053ba52b0d");
      if (element == null) {
        console.log("Bokeh: ERROR: autoload.js configured with elementid 'e2ff64f7-cc10-4c63-ae55-03053ba52b0d' but no matching script tag was found. ")
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
                  var docs_json = {"674befef-4bfd-4843-9537-043f0c29d5c8":{"roots":{"references":[{"attributes":{},"id":"ce640dc0-da40-47d4-991c-2f9a1e7f7299","type":"BasicTickFormatter"},{"attributes":{"active_drag":"auto","active_scroll":"auto","active_tap":"auto","tools":[{"id":"fb000984-f443-4ef9-bc66-7a542634788f","type":"PanTool"},{"id":"b7563990-df02-4f28-9fab-07b641f85d37","type":"WheelZoomTool"},{"id":"17ac3d47-6f13-4b78-b452-ed6548485304","type":"BoxZoomTool"},{"id":"df125314-6f75-483e-835d-0f9ca8f53bc1","type":"BoxSelectTool"},{"id":"0652ee64-4a93-487e-9057-4b6c9e307d8c","type":"ResetTool"},{"id":"fe0c54f9-6edd-4313-ac05-2ab9bc116a20","type":"SaveTool"},{"id":"9c0b3b5e-b8a2-4eea-8b47-d637c5e180df","type":"HoverTool"},{"id":"4274c3ef-7f52-4577-abc2-fd133e602f96","type":"ResizeTool"}]},"id":"73874574-57af-4393-8ab4-2ee2b89fc694","type":"Toolbar"},{"attributes":{"plot":{"id":"84b1fa18-50e0-4e81-8898-6c682bc43289","subtype":"Figure","type":"Plot"}},"id":"4274c3ef-7f52-4577-abc2-fd133e602f96","type":"ResizeTool"},{"attributes":{},"id":"7d3f9cd9-4450-4ed1-97c6-c5fb6d0f9de9","type":"BasicTicker"},{"attributes":{"axis_label":"mapped reads (% of total)","formatter":{"id":"ce640dc0-da40-47d4-991c-2f9a1e7f7299","type":"BasicTickFormatter"},"plot":{"id":"84b1fa18-50e0-4e81-8898-6c682bc43289","subtype":"Figure","type":"Plot"},"ticker":{"id":"88b887a4-2d8a-40e9-b705-a02363aaed7e","type":"BasicTicker"}},"id":"ce46a033-f344-4065-93f2-7e9946f8a828","type":"LinearAxis"},{"attributes":{"callback":null,"plot":{"id":"84b1fa18-50e0-4e81-8898-6c682bc43289","subtype":"Figure","type":"Plot"},"tooltips":[["Sample","@SM"],["Chromosome","@chr"]]},"id":"9c0b3b5e-b8a2-4eea-8b47-d637c5e180df","type":"HoverTool"},{"attributes":{"plot":{"id":"84b1fa18-50e0-4e81-8898-6c682bc43289","subtype":"Figure","type":"Plot"}},"id":"fe0c54f9-6edd-4313-ac05-2ab9bc116a20","type":"SaveTool"},{"attributes":{"plot":{"id":"84b1fa18-50e0-4e81-8898-6c682bc43289","subtype":"Figure","type":"Plot"}},"id":"0652ee64-4a93-487e-9057-4b6c9e307d8c","type":"ResetTool"},{"attributes":{"callback":null},"id":"7d04847a-6ff7-4173-b78e-71dbaab2718a","type":"DataRange1d"},{"attributes":{},"id":"88b887a4-2d8a-40e9-b705-a02363aaed7e","type":"BasicTicker"},{"attributes":{"data_source":{"id":"60b37c07-1e19-49a9-a924-2abf05a4ada5","type":"ColumnDataSource"},"glyph":{"id":"70657c30-e190-47df-b099-53c88307e8bf","type":"Circle"},"hover_glyph":null,"nonselection_glyph":{"id":"05b3db60-c30e-4d71-b0c7-8042eb12f764","type":"Circle"},"selection_glyph":null},"id":"d36996b9-6544-4aa9-9a75-54a71e479ab2","type":"GlyphRenderer"},{"attributes":{"axis_label":"chrlen (% of genome)","formatter":{"id":"9e0ab92a-35b4-4e8f-8364-83700eef05de","type":"BasicTickFormatter"},"plot":{"id":"84b1fa18-50e0-4e81-8898-6c682bc43289","subtype":"Figure","type":"Plot"},"ticker":{"id":"7d3f9cd9-4450-4ed1-97c6-c5fb6d0f9de9","type":"BasicTicker"}},"id":"d179297e-46a6-4317-bc38-71a66d177a8b","type":"LinearAxis"},{"attributes":{"plot":{"id":"84b1fa18-50e0-4e81-8898-6c682bc43289","subtype":"Figure","type":"Plot"},"ticker":{"id":"7d3f9cd9-4450-4ed1-97c6-c5fb6d0f9de9","type":"BasicTicker"}},"id":"15323839-9cfc-49d7-b737-dc142c98cf5d","type":"Grid"},{"attributes":{"callback":null,"overlay":{"id":"dfec31c0-aa48-492c-89c9-ace10de01395","type":"BoxAnnotation"},"plot":{"id":"84b1fa18-50e0-4e81-8898-6c682bc43289","subtype":"Figure","type":"Plot"},"renderers":[{"id":"d36996b9-6544-4aa9-9a75-54a71e479ab2","type":"GlyphRenderer"}]},"id":"df125314-6f75-483e-835d-0f9ca8f53bc1","type":"BoxSelectTool"},{"attributes":{"plot":null,"text":null},"id":"e834ad89-c054-440e-ba5e-550dbfd40e17","type":"Title"},{"attributes":{"plot":{"id":"84b1fa18-50e0-4e81-8898-6c682bc43289","subtype":"Figure","type":"Plot"}},"id":"fb000984-f443-4ef9-bc66-7a542634788f","type":"PanTool"},{"attributes":{"bottom_units":"screen","fill_alpha":{"value":0.5},"fill_color":{"value":"lightgrey"},"left_units":"screen","level":"overlay","line_alpha":{"value":1.0},"line_color":{"value":"black"},"line_dash":[4,4],"line_width":{"value":2},"plot":null,"render_mode":"css","right_units":"screen","top_units":"screen"},"id":"dfec31c0-aa48-492c-89c9-ace10de01395","type":"BoxAnnotation"},{"attributes":{},"id":"fe8f7064-cfd0-416e-804c-73c0c74f9c12","type":"ToolEvents"},{"attributes":{"below":[{"id":"d179297e-46a6-4317-bc38-71a66d177a8b","type":"LinearAxis"}],"left":[{"id":"ce46a033-f344-4065-93f2-7e9946f8a828","type":"LinearAxis"}],"plot_width":800,"renderers":[{"id":"d179297e-46a6-4317-bc38-71a66d177a8b","type":"LinearAxis"},{"id":"15323839-9cfc-49d7-b737-dc142c98cf5d","type":"Grid"},{"id":"ce46a033-f344-4065-93f2-7e9946f8a828","type":"LinearAxis"},{"id":"8241e340-23d8-4886-b87f-af5a14b5fbc9","type":"Grid"},{"id":"678f333f-748c-4eb2-ac77-d49251000b53","type":"BoxAnnotation"},{"id":"dfec31c0-aa48-492c-89c9-ace10de01395","type":"BoxAnnotation"},{"id":"d36996b9-6544-4aa9-9a75-54a71e479ab2","type":"GlyphRenderer"}],"title":{"id":"e834ad89-c054-440e-ba5e-550dbfd40e17","type":"Title"},"tool_events":{"id":"fe8f7064-cfd0-416e-804c-73c0c74f9c12","type":"ToolEvents"},"toolbar":{"id":"73874574-57af-4393-8ab4-2ee2b89fc694","type":"Toolbar"},"x_range":{"id":"b937f2c4-5e12-4a6b-919f-a3d96ae3606f","type":"DataRange1d"},"y_range":{"id":"7d04847a-6ff7-4173-b78e-71dbaab2718a","type":"DataRange1d"}},"id":"84b1fa18-50e0-4e81-8898-6c682bc43289","subtype":"Figure","type":"Plot"},{"attributes":{"fill_alpha":{"value":0.9},"fill_color":{"field":"SM"},"line_alpha":{"value":0.9},"line_color":{"field":"SM"},"size":{"units":"screen","value":6},"x":{"field":"chrlen_percent"},"y":{"field":"mapped_bases_percent"}},"id":"70657c30-e190-47df-b099-53c88307e8bf","type":"Circle"},{"attributes":{"bottom_units":"screen","fill_alpha":{"value":0.5},"fill_color":{"value":"lightgrey"},"left_units":"screen","level":"overlay","line_alpha":{"value":1.0},"line_color":{"value":"black"},"line_dash":[4,4],"line_width":{"value":2},"plot":null,"render_mode":"css","right_units":"screen","top_units":"screen"},"id":"678f333f-748c-4eb2-ac77-d49251000b53","type":"BoxAnnotation"},{"attributes":{"callback":null,"column_names":["mapped_bases","chrlen","mapped_bases_percent","index","SM","chr","chrlen_percent","sd","mean_coverage"],"data":{"SM":["S1","S1","S2","S2"],"chr":["chr1","chr2","chr1","chr2"],"chrlen":[4000000.0,1000000.0,4000000.0,1000000.0],"chrlen_percent":[80,20,80,20],"index":[0,1,2,3],"mapped_bases":[8000000.0,12000000.0,12000000.0,8000000.0],"mapped_bases_percent":[40,60,60,40],"mean_coverage":[2,12,3,8],"sd":[5,20,5,20]}},"id":"60b37c07-1e19-49a9-a924-2abf05a4ada5","type":"ColumnDataSource"},{"attributes":{"dimension":1,"plot":{"id":"84b1fa18-50e0-4e81-8898-6c682bc43289","subtype":"Figure","type":"Plot"},"ticker":{"id":"88b887a4-2d8a-40e9-b705-a02363aaed7e","type":"BasicTicker"}},"id":"8241e340-23d8-4886-b87f-af5a14b5fbc9","type":"Grid"},{"attributes":{},"id":"9e0ab92a-35b4-4e8f-8364-83700eef05de","type":"BasicTickFormatter"},{"attributes":{"callback":null},"id":"b937f2c4-5e12-4a6b-919f-a3d96ae3606f","type":"DataRange1d"},{"attributes":{"fill_alpha":{"value":0.1},"fill_color":{"value":"#1f77b4"},"line_alpha":{"value":0.1},"line_color":{"value":"#1f77b4"},"size":{"units":"screen","value":6},"x":{"field":"chrlen_percent"},"y":{"field":"mapped_bases_percent"}},"id":"05b3db60-c30e-4d71-b0c7-8042eb12f764","type":"Circle"},{"attributes":{"overlay":{"id":"678f333f-748c-4eb2-ac77-d49251000b53","type":"BoxAnnotation"},"plot":{"id":"84b1fa18-50e0-4e81-8898-6c682bc43289","subtype":"Figure","type":"Plot"}},"id":"17ac3d47-6f13-4b78-b452-ed6548485304","type":"BoxZoomTool"},{"attributes":{"plot":{"id":"84b1fa18-50e0-4e81-8898-6c682bc43289","subtype":"Figure","type":"Plot"}},"id":"b7563990-df02-4f28-9fab-07b641f85d37","type":"WheelZoomTool"}],"root_ids":["84b1fa18-50e0-4e81-8898-6c682bc43289"]},"title":"Bokeh Application","version":"0.12.3"}};
                  var render_items = [{"docid":"674befef-4bfd-4843-9537-043f0c29d5c8","elementid":"e2ff64f7-cc10-4c63-ae55-03053ba52b0d","modelid":"84b1fa18-50e0-4e81-8898-6c682bc43289"}];
                  
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