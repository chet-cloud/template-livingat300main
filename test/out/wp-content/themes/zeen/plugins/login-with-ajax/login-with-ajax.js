jQuery(document).ready(function(r){var s=r(document);function o(a,t){t=r(t),!0===a.result?t.attr("class","lwa-status lwa-status-confirm").html(a.message):!1===a.result?t.attr("class","lwa-status lwa-status-invalid").html(a.error):t.attr("class","lwa-status lwa-status-invalid").html("Error.")}s.on("click",".lwa-changer",function(a){a.preventDefault(),r(this).closest(".tipi-logged-out-wrap").removeClass("lwa-active-1 lwa-active-2 lwa-active-3").addClass("lwa-active-"+r(this).data("changer"))}),s.on("click",".lwa-cancel",function(a){a.preventDefault(),r(this).closest(".tipi-logged-out-wrap").removeClass("lwa-active-1 lwa-active-2 lwa-active-3").addClass("lwa-active-1")}),r("form.lwa-form, form.lwa-remember, form.lwa-register").submit(function(a){a.preventDefault();var t=r(this),e=t.closest(".tipi-logged-out"),l=t.find(".lwa-status"),i=t.find(".lwa-ajax");0===i.length&&(i=r('<input class="lwa-ajax" name="lwa" type="hidden" value="1" />'),t.prepend(i));var n="undefined"!=typeof LWA?n=LWA.ajaxurl:t.attr("action");r.ajax({type:"POST",url:n,data:t.serialize(),beforeSend:function(){e.addClass("loading").parent().addClass("tipi-spin")},success:function(a){o(a,l),s.trigger("lwa_"+a.action,[a,t]),e.removeClass("loading").parent().removeClass("tipi-spin")},error:function(){o({},l)},dataType:"jsonp"})}),s.on("lwa_login",function(a,t,l){!0===t.result&&(null!==t.widget&&void 0!==t.widget?r.get(t.widget,function(a){var t=r(a);l.parent(".lwa").replaceWith(t);var e=t.find(".").show();t.parent().find(".lwa-title").replaceWith(e)}):null===t.redirect||void 0===t.redirect?window.location.reload():window.location=t.redirect)})});