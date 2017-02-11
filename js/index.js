$(function() {
    var data = [];
    var companyName = document.querySelector("#companyName");
    var company_icon = document.querySelector(".company-icon");
    var record = document.querySelector(".record");
    var companyId = document.querySelector("#companyId");
    var send = document.querySelector("#send");
    var li = document.querySelectorAll("#app li span");
    var app = "";
    var a = ["s"];

    var company = new Vue({
        el: '#company',
        data: {
            items: []
        },
        methods: {
            loadMore: function(moreData) {
                this.items.push(moreData);
            },
            toggle: function(index) {
                // console.info(index);
                companyName.value = this.items[index].expName;
                data[0] = this.items[index].simpleName;
                data[3] = this.items[index].expName;
            }
        }
    });

    $.ajax({
        url: "https://route.showapi.com/64-20?maxSize=100000&showapi_appid=31610&showapi_sign=794da37ef6d548bdb3faf07de393bc6d",
        type: "get",
        dataType: "json",
        success: function(json) {
            console.log(json.showapi_res_body.expressList);

            // app.changeFlag(json.showapi_res_body.flag);
            // if (json.showapi_res_body.flag) {
            for (var i = 0; i < json.showapi_res_body.expressList.length; i++) {
                company.loadMore(json.showapi_res_body.expressList[i]);
                // console.log("1");
            }
            //     var myjson = { "key": data[0], "id": data[1], "name": data[3] };
            //     records.loadMore(myjson);
            // }
        }
    });


    function IsPC() {
        var userAgentInfo = navigator.userAgent;
        var Agents = ["Android", "iPhone",
            "SymbianOS", "Windows Phone",
            "iPad", "iPod"
        ];
        var flag = true;
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
                flag = false;
                break;
            }
        }
        return flag;
    }

    if (!IsPC()) {
        $(".container").on("click", ".name", function() {
            $(".record-div").hide();
            $(".box").hide();
        });
    }


    $(".fa-times").click(function() {
        $("#companyId").val("");
    });

    document.onclick = function(e) {
        // alert();
        $(".record-div").hide();
        $(".box").hide();
        // e.stopPropagation();
    };
    companyName.onclick = function(e) {
        // alert();
        $(".box").toggle();
        e.stopPropagation();
        // for (var i = 0; i < li.length; i++) {
        // li[i].innerHTML = "";
        // }
    };
    record.onclick = function(e) {
        $(".record-div").toggle();
        e.stopPropagation();
    };

    company_icon.onclick = function(e) {
        $(".box").toggle();
        e.stopPropagation();
    };
    // var ul = $(".sss li");
    $(".always li").click(function() {
        // alert();
        // alert($(this).attr("key"));
        // alert();
        data[0] = $(this).attr("key");
        data[3] = $(this)[0].innerHTML;
        // alert(data[3]);
        companyName.value = $(this)[0].innerHTML;
        $(".box").toggle();
    });

    $(".ul-all li").click(function() {
        $(".box").toggle();
    });






    var records = new Vue({
        el: '#records',
        data: {
            items: []
        },
        methods: {
            loadMore: function(moreData) {
                this.items.push(moreData);
                // alert();
            },
            toggle: function(index) {
                // console.info(index);
                companyName.value = this.items[index].name;
                companyId.value = this.items[index].id;
                data[0] = this.items[index].key;
                data[3] = this.items[index].name;
                data[1] = this.items[index].id;
            }
        }
    });

    app = new Vue({
        el: '#app',
        data: {
            items: [],
            flag: true
        },
        methods: {
            delete: function() {
                // alert();
                this.items.splice(0);
            },
            loadMore: function(moreData) {
                this.items.push(moreData);
                console.log("2");
            },
            changeFlag: function(flag) {
                this.flag = flag;
                console.log(flag);
            },
            getFlag: function() {
                return this.flag;
            }
        }
    });

    send.onclick = function() {
        app.delete();
        // alert(companyId.value);
        data[1] = companyId.value;
        // alert(data[1]);
        if (data[0] && data[1]) {
            $.ajax({
                url: "https://route.showapi.com/64-19?com=" + data[0] + "&nu=" + data[1] + "&showapi_appid=31610&showapi_sign=794da37ef6d548bdb3faf07de393bc6d",
                type: "get",
                dataType: "json",
                success: function(json) {
                    console.log(json);
                    // console.log(json.showapi_res_body.showapi_res_error);
                    // console.log(json.showapi_res_body.data);
                    app.changeFlag(json.showapi_res_body.flag);
                    if (json.showapi_res_body.flag) {
                        for (var i = 0; i < json.showapi_res_body.data.length; i++) {
                            app.loadMore(json.showapi_res_body.data[i]);
                            // console.log("1");
                        }
                        var myjson = { "key": data[0], "id": data[1], "name": data[3] };
                        records.loadMore(myjson);
                    }
                }
            });
        }
    };
});