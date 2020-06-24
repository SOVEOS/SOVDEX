var storebalance = 0;
var svxpower = 0;
var svx_supply = 0;

function set_circle_element(elm, value) {
    value = value.toFixed(0);
    if (value > 100) value = 100;

    value2 = (360 / 100) * value;
    // ---
    /*
    circle2
    */
    elm2 = elm + "_text";
    let f4 = document.getElementById(elm2);
    f4.textContent = value + "%";

    let f3 = document.getElementById(elm);

    if (value >= 0 && value <= 60)
        f3.setAttribute('stroke', "#00bb00");

    if (value >= 60 && value <= 75)
        f3.setAttribute('stroke', "#ffaa00");

    if (value >= 75)
        f3.setAttribute('stroke', "#ff5555");

    var buffer = "";

    // 

    var cx = 200;
    var cy = 200;

    //   buffer += "M "+cx+" "+cy+" ";
    buffer += "";

    var radius = 170;

    var maxrad = value2;
    for (var deg = 0; deg < maxrad; deg += 5) {
        deg2 = -deg + 180;

        var x = Math.sin(deg2 * Math.PI / 180) * radius;
        var y = Math.cos(deg2 * Math.PI / 180) * radius;

        if (deg == 0) {
            buffer += "M " + (x + cx) + " " + (y + cy) + " ";

            } else {
                buffer += "L " + (x + cx) + " " + (y + cy) + " ";
            }
        }
        // buffer += "L 240 300 ";
        //  buffer += "L 240 350 ";
        buffer += " ";

        f3.setAttribute('d', buffer);

    } // set_circle_element

    function set_circle_element_node(elm, value) {
        value = value.toFixed(0);
        value2 = (360 / 100) * value;
        // ---
        /*
        circle2
        */            
        let f3 = document.getElementById(elm);

        if (value >= 0 && value <= 25)
            f3.setAttribute('stroke', "#ff5555");

        if (value >= 25 && value <= 50)
            f3.setAttribute('stroke', "#ffaa00");

        if (value >= 50 && value <= 75)
            f3.setAttribute('stroke', "#5bc0de");

        if (value >= 75 && value <=99)
                f3.setAttribute('stroke', "#0275d8");

        if (value >= 100)
            f3.setAttribute('stroke', "#00bb00");

        var buffer = "";

        // 

        var cx = 200;
        var cy = 200;

        //   buffer += "M "+cx+" "+cy+" ";
        buffer += "";

        var radius = 170;

        var maxrad = value2;
        for (var deg = 0; deg < maxrad; deg += 5) {
            deg2 = -deg + 180;

            var x = Math.sin(deg2 * Math.PI / 180) * radius;
            var y = Math.cos(deg2 * Math.PI / 180) * radius;

            if (deg == 0) {
                buffer += "M " + (x + cx) + " " + (y + cy) + " ";

            } else {
                buffer += "L " + (x + cx) + " " + (y + cy) + " ";
            }
        }
        // buffer += "L 240 300 ";
        //  buffer += "L 240 350 ";
        buffer += " ";

        f3.setAttribute('d', buffer);

    } // set_circle_element

    var radius = 0;
    var radius_net = 0;
    var radius_node = 0;

    function doitx(param) {
        //alert("P: " + param);

        if (param == 1) {
            //   document.getElementById('kreis').cx = 230;

            radius_net += 5;
            set_circle_element("mynet", radius_net);

        }

        if (param == 2) {
            //  let f1 = document.getElementById('kreis');
            //f1.setAttribute('cx','210');

            cpuvalue = document.getElementById('cpuvalue').value;

            radius += 10.1;
            // radius = 50;
            set_circle_element("mycpu", radius);

            // <circle id='kreis' cx="200" cy="200" r="40" stroke="#999999" stroke-width="1" fill="#ffffff" />

            // ---
        }

            if (param == 3) {
                        //   document.getElementById('kreis').cx = 230;

            radius_node += 5;
            set_circle_element_node("mynode", radius_node);

        }



}


var counter = 0;
                    var xtracounter = 0;
                    var initstatus = 0;
                    var automining = 0;

                    /*
                    function doit()
                    {
                    xtracounter = 3;
                    alert("T2");
                    }
                    */

                    var autominer_cnt = 0;

                    function switch_autominer(val) {

                        // alert(val.checked);

                        if (val.checked) automining = 1;
                        else automining = 0;

                        //alert("automining:" + automining);

                    } // switch_autominer

                    function update_ticker() {
                        autominer_cnt++;

                        if (autominer_cnt == 11) autominer_cnt = 1;
                        //---
                        for (var i = 1; i <= 10; i++) {
                            var therect = 'rect' + i;
                            let f2 = document.getElementById(therect);
                            f2.setAttribute('fill', "#cccccc");

                        }

                        var therect = 'rect' + autominer_cnt;
                        let f3 = document.getElementById(therect);
                        f3.setAttribute('fill', "#000000");
                        //---        

                    } // update_ticker

                    function app_thread() {
                        counter++;

                        // show buttons 
                        if (scatter_account != undefined && scatter_account != "") {
                            document.getElementById('doinit').style.background = "#00C851";
                            
                        }

                        if (automining > 0) {

                            //  

                            //       dotransaction();
                            // ACTIVATE
                            dotransaction_bundle();
                        }

                        time = setTimeout('app_thread()', 5500);
                    }
                    // function app_thread()

                    // Transaction BEGIN ------------------------
                    function dotransaction() {
                        //alert("tr");
                        // sovsovsov223 svxmintofeos
                        /*
                        sov_burn_amount ...
                        */

                        //   var sov_amount = "0.0001 EOS";
                        var sov_amount = "100.0000 SOV";

                        var sov_burn_amount = document.getElementById('sov_burn_amount').value;
                        sov_burn_amount = format_eos_amount(sov_burn_amount);
                        sov_amount = sov_burn_amount + " SOV";

                        var sov_memo = "mine SVX";
                        //   var sov_receive_account = "themintofeos";
                        var sov_receive_account = "sovdexrelays";

                        //sov_receive_account = "sovmintofeos";
                        //var sov_memo   = "";
                        /*
                         account: 'sovmintofeos',
                        //                            account: 'sovsovsov223',
                                                    name: 'transfer',
                                                    authorization: [{
                                                        actor: scatter_account,
                                                        permission: "active"
                                                    }],
                                                    data: {
                                                        "from": scatter_account,
                                                        "to": sov_receive_account,
                                                        "quantity": sov_amount,
                                                        "memo": sov_memo
                                                    }
                        */

                        eosobject.transaction({
                            actions: [{
                                //                            account: 'eosio.token',
                                account: 'sovmintofeos',
                                //                            account: 'sovsovsov223',
                                name: 'transfer',
                                authorization: [{
                                    actor: scatter_account,
                                    permission: "active"
                                }],
                                data: {
                                    "from": scatter_account,
                                    "to": sov_receive_account,
                                    "quantity": sov_amount,
                                    "memo": sov_memo
                                }

                            }]
                        }).then(result => {
                            // If Success

                            console.log("Success!!!");

                            //alert('Success');

                            return;
                        }).catch(error => {
                            console.log("jsonerr: " + error);
                            // Error details

                            err = JSON.parse(error);
                            console.log("Error Transaction " + err);

                            //alert( 'Error:' + err.error.details[0].message );

                            
                            return;

                        });

                    } // function dotransaction()

                    // Transaction END ------------------------

                    // Transaction BEGIN ------------------------
                    function dotransaction_bundle() {


                         eosobject.getTableRows({
                            "json": "true",
                            "code": "svxmintofeos",
                            "scope": "SVX",
                            "table": "stat"
                        }).then(function(value) {
                                //console.log("Table stat: ");
                                //console.log(value);

                                svx_supply = value.rows[0].supply;

                                svx_supply = parseFloat(svx_supply);


                            } // value

                        );

                         eosobject.getTableRows({
                            "json": "true",
                            "code": "svxmintofeos",
                            "scope": "svxmintofeos",
                            "table": "accounts"
                        }).then(function(value) {
                                //console.log("Table stat: ");
                                //console.log(value);

                                svx_mining_supply = value.rows[0].balance;
                                svx_mining_supply = parseFloat(svx_mining_supply);

                            } // value

                        );

                        //var scatter_account2 = 'junglediceio';
                        eosobject.getTableRows({
                            "json": "true",
                            "code": "svxmintofeos",
                            "scope": scatter_account,
                            "table": "accounts"
                        }).then(function(value) {
                         

                            
                                var svxUserBalance = value.rows[0].balance;
                                svxUserBalance = parseFloat(svxUserBalance).toFixed(4);
                                

                                var last = value.rows[0].balance;
                                last = last.replace("SVX", "");

                                storebalance = value.rows[0].storebalance;
                                svxpower = value.rows[0].svxpower;
                                unstaking = value.rows[0].unstaking;
                                unstake_time = value.rows[0].unstake_time;

                                var svxStoreBalance = parseFloat(storebalance).toFixed(4);
                                var svxUserLiquidBalance = svxUserBalance - svxStoreBalance;
                                    svxUserLiquidBalance - parseFloat(svxUserBalance).toFixed(4);
                               

                                var svxPowerAmount = parseFloat(svxpower).toFixed(4);


                                //         document.getElementById('debug').innerHTML = "+ " + last;     
                         

                                
                            //---

                            /*  var storebalance = value.rows[0].storebalance;
                            var unstaking = value.rows[0].unstaking;
                            var unstake_time = value.rows[0].unstake_time;
                            */
                           
                        });

                        var targetMiningRate = document.getElementById('target_mining_rate').value;

                        var bonus_percentage = 0;

                                if (parseFloat(svx_supply) > 0 && parseFloat(svxpower) > 0) {

                                    bonus_percentage = (parseFloat(svxpower) / parseFloat(svx_supply)) * 10000;

                                    if (bonus_percentage > 50) bonus_percentage = 50;

                                    bonus_percentage = parseFloat(bonus_percentage).toFixed(2);
                                    //                           bonus_percentage = (svxpower / svx_supply) * 10;

                                }

                                else bonus_percentage = 0;

            
                                    var mining_multiplier_start = document.getElementById('sov_burn_amount').value;
                                    if (mining_multiplier_start < 150) mining_multiplier_start = 0;
                                    mining_multiplier_start = format_eos_amount(mining_multiplier_start);
                                    
                                    mining_multiplier = Math.log10((mining_multiplier_start / 100) / .15);


                        var mining_rate = (svx_mining_supply / 20000) * (1 + (bonus_percentage / 100)) * mining_multiplier;
                                    

                        var sov_amount = "100.0000 SOV";

                        var sov_burn_amount = document.getElementById('sov_burn_amount').value;
                        sov_burn_amount = format_eos_amount(sov_burn_amount);
                        sov_amount = sov_burn_amount + " SOV";

                        var sov_memo = "mine SVX";
                        //   var sov_receive_account = "themintofeos";
                        var sov_receive_account = "sovdexrelays";

                        var myRange = document.getElementById('myRange').value;
                        //alert("myRange: " + myRange);

                        var action = {

                            account: 'sovmintofeos',
                            name: 'transfer',
                            authorization: [{
                                actor: scatter_account,
                                permission: "active"
                            }],
                            data: {
                                "from": scatter_account,
                                "to": sov_receive_account,
                                "quantity": sov_amount,
                                "memo": sov_memo
                            }
                        };

                        if (mining_rate > targetMiningRate) {

                        console.log("============================");
                        console.log(action);

                        //var actions = [ action, action ]; 
                        var theactions = [];
                        for (var i = 0; i < myRange; i++) {
                            theactions[i] = action;
                        }
                        console.log(theactions);


                        eosobject.transaction({
                            actions: theactions
                        }).then(result => {
                            // If Success

                            console.log("Success!!!");

                            //alert('Success');

                            update_ticker();

                            return;
                        }).catch(error => {
                            console.log("jsonerr: " + error);
                            // Error details

                            err = JSON.parse(error);
                            console.log("Error Transaction " + err);

                            //alert( 'Error:' + err.error.details[0].message );

                            
                            return;

                        });

                        return (0);

                    }} // function dotransaction()

                    // Transaction END ------------------------

                    // DoInit BEGIN ------------------------
                    function doinit() {
                        /*
                        svxmintofeos    
                        svxmintofeos - open
                        letsjustdoit active
                        owner: letsjustdoit
                        ram_payer: letsjustdoit  sovdexrelays
                        symbol: 4,SVX

                        cleos -u https://jungle2.cryptolions.io:443  push action svxmintofeos open '{"owner":"garygarygary","symbol":"4,SVX","ram_payer":"garygarygary"}' -p garygarygary@active

                        */
                        //alert("do init")

                        //   var sov_receive_account = "themintofeos";
                        var sov_receive_account = "svxmintofeos";

                        eosobject.transaction({
                            actions: [{
                                account: "svxmintofeos",
                                name: "open2",
                                authorization: [{
                                    actor: scatter_account,
                                    permission: "active"
                                }],
                               
                                data: {
                                    "user": scatter_account,
                                }
                            }]
                        }).then(result => {
                            // If Success

                            console.log("Success!!!");

                            alert('Success');

                            return;
                        }).catch(error => {
                            console.log(eosobject);
                            console.log("---ERROR: ");
                            console.log(error);
                            // Error details

                            err = JSON.parse(error);
                            console.log("Error Transaction " + err);

                            alert('-----Error:' + err.error.details[0].message);

                            //nalert('<br><div class=\'checkmark_red\'></div>Error' + err.error.name +'<br><br>','white');  
                            return;

                        });

                    }
                    // DoInit END ------------------------

                    function timeConverter(UNIX_timestamp) {
                        var a = new Date(UNIX_timestamp * 1000);
                        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                        var year = a.getFullYear();
                        var month = months[a.getMonth()];
                        var date = a.getDate();
                        var hour = a.getHours();
                        var min = a.getMinutes();
                        var sec = a.getSeconds();
                        var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
                        return time;
                    }

                    // GetBalance BEGIN ------------------------
                    function get_balance() {

                        if (scatter_account == undefined) return;
                        if (eosobject == null) return;

                        eosobject.getAccount(scatter_account).then(function(value) {

                                //console.log(value);
                                if (value == null)
                                    return;

                                var cpu_available = value.cpu_limit.available;

                                var cpu_max = value.cpu_limit.max;

                                var cpu_used = value.cpu_limit.used;

                                var net_max = value.net_limit.max;

                                var net_used = value.net_limit.used;

                                var balance = value.core_liquid_balance;

                                var balance1 = value.core_liquid_balance;

                                var balance2 = value.core_liquid_balance;

                                var cpu_proz = (cpu_used / cpu_max) * 100;
                                cpu_proz = Number(cpu_proz).toFixed(1);

                                var net_proz = (net_used / net_max) * 100;
                                net_proz = Number(net_proz).toFixed(1);

                                if (document.getElementById('balance')) {
                                    document.getElementById('balance').innerHTML = "" + balance;
                                }

                                if (document.getElementById('balance1')) {
                                    document.getElementById('balance1').innerHTML = "" + balance;
                                }

                                if (document.getElementById('balance2')) {
                                    document.getElementById('balance2').innerHTML = "" + balance;
                                }

                                if (document.getElementById('mycpu')) {
                                    cpu_proz = Number(cpu_proz).toFixed(0) * 1;
                                    //  document.getElementById('div_cpu').innerHTML =  cpu_proz + "%";
                                    set_circle_element("mycpu", cpu_proz);
                                }

                                if (document.getElementById('mynet')) {
                                    net_proz = Number(net_proz).toFixed(0) * 1;

                                    // document.getElementById('div_net').innerHTML =  net_proz + "%";
                                    set_circle_element("mynet", net_proz);
                                }

                                //div_cpu div_net

                            } // function

                        );

                        /*
                        sov_balance svx_balance
                        */

                        eosobject.getTableRows({
                            "json": "true",
                            "code": "sovmintofeos",
                            "scope": scatter_account,
                            "table": "accounts"
                        }).then(function(value) {

                            var wert = value.rows.length;

                            try {
                                var last = value.rows[0].balance;
                                last = last.replace("SOV", "");

                                var unstaking = value.rows[0].unstaking;
                                var unstake_time = value.rows[0].unstake_time;

                                balance_token = last * 10000;

                                //document.getElementById('balance').innerHTML = "Your Balance: <span class='bold'>" + last + "</span>";
                                if (document.getElementById('sov_balance')) {
                                    document.getElementById('sov_balance').innerHTML = "<span class='bold'>" + last + " SOV</span>";
                                }

                                if (document.getElementById('SOVBALANCE')) {
                                    document.getElementById('SOVBALANCE').innerHTML = "<span class='bold'>" + last + " SOV</span>";
                                }

                                if (document.getElementById('SOVUSDTBALANCE')) {
                                    document.getElementById('SOVUSDTBALANCE').innerHTML = "<span class='bold'>" + last + " SOV</span>";
                                }

                                


                            } catch (err) {


                            }


                        });



                        eosobject.getTableRows({
                            "json": "true",
                            "code": "tethertether",
                            "scope": scatter_account,
                            "table": "accounts"
                        }).then(function(value) {

                            var wert = value.rows.length;

                            try {
                                var last = value.rows[0].balance;
                                last = last.replace("USDT", "");

                                balance_token = last * 10000;

                                //document.getElementById('balance').innerHTML = "Your Balance: <span class='bold'>" + last + "</span>";
                                if (document.getElementById('USDTBALANCE')) {
                                    document.getElementById('USDTBALANCE').innerHTML = "<span class='bold'>" + last + " USDT</span>";
                                }


                            } catch (err) {


                            }


                        });


                        eosobject.getTableRows({
                            "json": "true",
                            "code": "btc.ptokens",
                            "scope": scatter_account,
                            "table": "accounts"
                        }).then(function(value) {

                            var wert = value.rows.length;

                            try {
                                var last = value.rows[0].balance;
                                last = last.replace("pBTC", "");

                                balance_token = last * 10000;

                                //document.getElementById('balance').innerHTML = "Your Balance: <span class='bold'>" + last + "</span>";
                                if (document.getElementById('PBTCBALANCE')) {
                                    document.getElementById('PBTCBALANCE').innerHTML = "<span class='bold'>" + last + "</span>";
                                }


                            } catch (err) {


                            }


                        });


                    

               
                        eosobject.getTableRows({
                            "json": "true",
                            "code": "sovdexrelays",
                            "scope": "EOS",
                            "table": "pair"
                        }).then(function(value) {
      
                            var soveosPrice = value.rows[0].price;
                            const soveosCW = value.rows[0].cw;
                            var soveosBalance = value.rows[0].connectorbal;
                            var soveosOutstanding = value.rows[0].outstandingbal;
                            var eosTransferAmount = document.getElementById('eos_transfer_amount').value;
                            var sovTransferAmount = document.getElementById('sov_transfer_amount').value;
                            soveosBalance = parseFloat(soveosBalance);
                            soveosOutstanding = parseFloat(soveosOutstanding);
                            eosTransferAmount = parseFloat(eosTransferAmount);
                            sovTransferAmount = parseFloat(sovTransferAmount);
                            soveosPrice = parseFloat(soveosPrice).toFixed(8);   


                            var buysoveosBancor = (-soveosOutstanding*(Math.pow((1-(eosTransferAmount /(soveosBalance + eosTransferAmount))), (soveosCW/100))-1)).toFixed(4);

                            var sellsoveosBancor = (-soveosBalance*(Math.pow(((1-(sovTransferAmount / (soveosOutstanding + sovTransferAmount)))), (1/(soveosCW/100)))-1)).toFixed(4);

                            var buysoveosAvgPrice = (eosTransferAmount / buysoveosBancor).toFixed(8);
                            var sellsoveosAvgPrice = (sellsoveosBancor / sovTransferAmount).toFixed(8);

                            buysoveosBancorDiv.textContent = (buysoveosBancor);
                            sellsoveosBancorDiv.textContent = (sellsoveosBancor);

                            BUYSOVEOSAVGPRICE.innerText = ("Price with slippage = " + buysoveosAvgPrice + " EOS");
                            SELLSOVEOSAVGPRICE.innerText = ("Price with slippage = " + sellsoveosAvgPrice + " EOS");
            
                            SOVEOSPRICE.innerText = ("SOV Price = " + soveosPrice + " EOS");



                            
                         });


                        eosobject.getTableRows({
                            "json": "true",
                            "code": "sovdexrelays",
                            "scope": "USDT",
                            "table": "pair"
                        }).then(function(value) {
      
                            var sovusdtPrice = value.rows[0].price;
                            const sovusdtCW = value.rows[0].cw;
                            var sovusdtBalance = value.rows[0].connectorbal;
                            var sovusdtOutstanding = value.rows[0].outstandingbal;
                            var usdtTransferAmount = document.getElementById('usdt_transfer_amount').value;
                            var sovTransferAmount = document.getElementById('sov_transfer_amount10').value;
                            sovusdtBalance = parseFloat(sovusdtBalance);
                            sovusdtOutstanding = parseFloat(sovusdtOutstanding);
                            usdtTransferAmount = parseFloat(usdtTransferAmount);
                            sovTransferAmount = parseFloat(sovTransferAmount);
                            sovusdtPrice = parseFloat(sovusdtPrice).toFixed(8);   


                            var buysovusdtBancor = (-sovusdtOutstanding*(Math.pow((1-(usdtTransferAmount /(sovusdtBalance + usdtTransferAmount))), (sovusdtCW/100))-1)).toFixed(4);

                            var sellsovusdtBancor = (-sovusdtBalance*(Math.pow(((1-(sovTransferAmount / (sovusdtOutstanding + sovTransferAmount)))), (1/(sovusdtCW/100)))-1)).toFixed(4);

                            var buysovusdtAvgPrice = (usdtTransferAmount / buysovusdtBancor).toFixed(8);
                            var sellsovusdtAvgPrice = (sellsovusdtBancor / sovTransferAmount).toFixed(8);

                            buysovusdtBancorDiv.textContent = (buysovusdtBancor);
                            sellsovusdtBancorDiv.textContent = (sellsovusdtBancor);

                            BUYSOVUSDTAVGPRICE.innerText = ("Price with slippage = " + buysovusdtAvgPrice + " USDT");
                            SELLSOVUSDTAVGPRICE.innerText = ("Price with slippage = " + sellsovusdtAvgPrice + " USDT");
            
                            SOVUSDTPRICE.innerText = ("SOV Price = " + sovusdtPrice + " USDT");
                            
                         });


                        eosobject.getTableRows({
                            "json": "true",
                            "code": "sovdexrelays",
                            "scope": "EOS",
                            "table": "svxpair"
                        }).then(function(value) {
      
                            var svxeosPrice = value.rows[0].price;
                            const svxeosCW = value.rows[0].cw;
                            var svxeosBalance = value.rows[0].connectorbal;
                            var svxeosOutstanding = value.rows[0].outstandingbal;
                            var svxTransferAmount = document.getElementById('svx_transfer_amount').value;
                            var eosTransferAmount = document.getElementById('eos_transfer_amount1').value;
                            svxeosBalance = parseFloat(svxeosBalance);
                            svxeosOutstanding = parseFloat(svxeosOutstanding);
                            eosTransferAmount = parseFloat(eosTransferAmount);
                            svxTransferAmount = parseFloat(svxTransferAmount);
                            svxeosPrice = parseFloat(svxeosPrice).toFixed(8);   


                            var buysvxeosBancor = (-svxeosOutstanding*(Math.pow((1-(eosTransferAmount /(svxeosBalance + eosTransferAmount))), (svxeosCW/100))-1)).toFixed(4);

                            var sellsvxeosBancor = (-svxeosBalance*(Math.pow(((1-(svxTransferAmount / (svxeosOutstanding + svxTransferAmount)))), (1/(svxeosCW/100)))-1)).toFixed(4);

                            var buysvxeosAvgPrice = (eosTransferAmount / buysvxeosBancor).toFixed(8);
                            var sellsvxeosAvgPrice = (sellsvxeosBancor / svxTransferAmount).toFixed(8);

                            buysvxeosBancorDiv.textContent = (buysvxeosBancor);
                            sellsvxeosBancorDiv.textContent = (sellsvxeosBancor);


                            BUYSVXEOSAVGPRICE.innerText = ("Price with slippage = " + buysvxeosAvgPrice + " EOS");
                            SELLSVXEOSAVGPRICE.innerText = ("Price with slippage = " + sellsvxeosAvgPrice + " EOS");
            
                            SVXEOSPRICE.innerText = ("SVX Price = " + svxeosPrice + " EOS");

                         });


                        eosobject.getTableRows({
                            "json": "true",
                            "code": "sovdexrelays",
                            "scope": "PBTC",
                            "table": "eospair"
                        }).then(function(value) {
      
                            var eospbtcPrice = value.rows[0].price;
                            const eospbtcCW = value.rows[0].cw;
                            var eospbtcBalance = value.rows[0].connectorbal;
                            var eospbtcOutstanding = value.rows[0].outstandingbal;
                            

                            var pbtcTransferAmount = document.getElementById('pbtc_transfer_amount').value;
                            var eosTransferAmount = document.getElementById('eos_transfer_amount2').value;
                            

                            eospbtcBalance = parseFloat(eospbtcBalance);
                            eospbtcOutstanding = parseFloat(eospbtcOutstanding);
                            pbtcTransferAmount = parseFloat(pbtcTransferAmount);
                            eosTransferAmount = parseFloat(eosTransferAmount);
                            eospbtcPrice = parseFloat(eospbtcPrice).toFixed(8);   


                            var buyeospbtcBancor = (-eospbtcOutstanding*(Math.pow((1-(pbtcTransferAmount /(eospbtcBalance + pbtcTransferAmount))), (eospbtcCW/100))-1)).toFixed(4);

                            var selleospbtcBancor = (-eospbtcBalance*(Math.pow(((1-(eosTransferAmount / (eospbtcOutstanding + eosTransferAmount)))), (1/(eospbtcCW/100)))-1)).toFixed(8);

                            var buyeospbtcAvgPrice = (pbtcTransferAmount / buyeospbtcBancor).toFixed(8);
                            var selleospbtcAvgPrice = (selleospbtcBancor / eosTransferAmount).toFixed(8);

                            buyeospbtcBancorDiv.textContent = (buyeospbtcBancor);
                            selleospbtcBancorDiv.textContent = (selleospbtcBancor);

                            BUYEOSPBTCAVGPRICE.innerText = ("Price with slippage = " + buyeospbtcAvgPrice + " pbtc");
                            SELLEOSPBTCAVGPRICE.innerText = ("Price with slippage = " + selleospbtcAvgPrice + " pBTC");
            
                            EOSPBTCPRICE.innerText = ("EOS Price = " + eospbtcPrice + " pBTC");


                         });



     


                        /*
                          svx_supply = value.rows[0].supply;

                                            var deflation_factor = 0;
                                            var stage;

                                            //sov_supply = Math.round( sov_supply );
                                            sov_supply = parseFloat(sov_supply);
                        */
                        //
                        // Get SVX supply
                        //
                        eosobject.getTableRows({
                            "json": "true",
                            "code": "svxmintofeos",
                            "scope": "SVX",
                            "table": "stat"
                        }).then(function(value) {
                                //console.log("Table stat: ");
                                //console.log(value);

                                svx_supply = value.rows[0].supply;

                                svx_supply = parseFloat(svx_supply).toFixed(4);


                            } // value

                        );

                         eosobject.getTableRows({
                            "json": "true",
                            "code": "svxmintofeos",
                            "scope": "svxmintofeos",
                            "table": "accounts"
                        }).then(function(value) {
                                //console.log("Table stat: ");
                                //console.log(value);

                                svx_mining_supply = value.rows[0].balance;
                                svx_mining_supply = parseFloat(svx_mining_supply).toFixed(4);

                            } // value

                        );

                        //var scatter_account2 = 'junglediceio';
                        eosobject.getTableRows({
                            "json": "true",
                            "code": "svxmintofeos",
                            "scope": scatter_account,
                            "table": "accounts"
                        }).then(function(value) {
                         

                            var wert = value.rows.length;
                            
                            //---

                            try {
                                var svxUserBalance = value.rows[0].balance;
                                    svxUserBalance = parseFloat(svxUserBalance).toFixed(4);
                                

                                var last = value.rows[0].balance;
                                last = last.replace("SVX", "");

                                storebalance = value.rows[0].storebalance;
                                storebalance = parseFloat(storebalance).toFixed(4);
                                svxpower = value.rows[0].svxpower;
                                svxpower = parseFloat(svxpower).toFixed(4);
                                unstaking = value.rows[0].unstaking;
                                unstakingNumber = parseFloat(unstaking).toFixed(4);
                                unstake_time = value.rows[0].unstake_time;

                                var svxStoreBalance = parseFloat(storebalance).toFixed(4);
                                var svxUserLiquidBalance = svxUserBalance - svxStoreBalance;
                                    svxUserLiquidBalance = parseFloat(svxUserLiquidBalance).toFixed(4);
                                var svxUserLiquidBalanceMax = Math.floor(svxUserLiquidBalance);
                               

                                var svxPowerAmount = parseFloat(svxpower).toFixed(4);
                                var svxMaxUnstake = Math.floor(svxPowerAmount);

                                var node_proz = (svxPowerAmount / 777000) * 100;
                                    node_proz = Number(node_proz).toFixed(1);

                                
                               // document.getElementById("svx_to_stake").value = stakingSlider.value;
                                //document.getElementById("svx_to_unstake").value = unstakingSlider.value;
                               // document.getElementById("stakingSlider").max = svxUserLiquidBalance;
                               // document.getElementById("unstakingSlider").max = svxPowerAmount;
                                document.getElementById("svx_to_stake").placeholder = "Max ≈ " + svxUserLiquidBalanceMax;
                                document.getElementById("svx_to_unstake").placeholder = "Max ≈ " + svxMaxUnstake;

                                 if (document.getElementById('SVXBALANCE')) {
                                     document.getElementById('SVXBALANCE').innerHTML = "<span class='bold'>" + svxUserLiquidBalance + " SVX</span>";
                                }

                                if (document.getElementById('SVXBALANCE1')) {
                                     document.getElementById('SVXBALANCE1').innerHTML = "<span class='bold'>" + svxUserLiquidBalance + " SVX</span>";
                                }

                                 if (document.getElementById('mynode')) {
                                    node_proz = Number(node_proz).toFixed(0) * 1;
                                    //  document.getElementById('div_cpu').innerHTML =  cpu_proz + "%";
                                    set_circle_element_node("mynode", node_proz);
                                }






                                //         document.getElementById('debug').innerHTML = "+ " + last;     
                                initstatus = 1;

                                // Disable init-button
                                document.getElementById('doinit').style.visibility = "hidden";
                                document.getElementById('dotransaction_bundle').style.visibility = "visible";


                                if (document.getElementById('svx_stake_balance')) {
                                    document.getElementById('svx_stake_balance').value = svxPowerAmount;
                                }

                                if (document.getElementById('svx_unstaking_balance')) {
                                    document.getElementById('svx_unstaking_balance').value = unstaking;
                                }

                                if (document.getElementById('svx_unstake_time') && unstakingNumber > 1) {
                                    timestring = timeConverter(unstake_time + 60 * 60 * 24);

                                    document.getElementById('svx_unstake_time').innerHTML = "<span class='bold'>(" + timestring + ")</span>";
                                } else {
                                    document.getElementById('svx_unstake_time').innerHTML = "<span class='bold'></span>";
                                }

                                var bonus_percentage = 0;

                                if (parseFloat(svx_supply) > 0 && parseFloat(svxpower) > 0) {

                                    bonus_percentage = (parseFloat(svxpower) / parseFloat(svx_supply)) * 10000;

                                    if (bonus_percentage > 50) bonus_percentage = 50;

                                    bonus_percentage = parseFloat(bonus_percentage).toFixed(2);
                                    //                           bonus_percentage = (svxpower / svx_supply) * 10;

                                    document.getElementById('svx_bonus').innerHTML = "<span class='bold' style='font-size:14px;'>Mining Bonus for Staking SVX: <span style='color:#00bb00'>" + bonus_percentage + "</span> %</span>";

                                } else
                                    document.getElementById('svx_bonus').innerHTML = "<span class='bold' style='font-size:16px;'>...</span>";

                                var feeDiscount = 0;

                                if (parseFloat(svx_supply) > 0 && parseFloat(svxpower) > 0) {

                                    feeDiscount = (parseFloat(svxpower) / parseFloat(svx_supply)) * 10000;

                                    if (feeDiscount < 5) feeDiscount = "0";
                                    else if (feeDiscount < 10) feeDiscount = "5";
                                    else if (feeDiscount < 15) feeDiscount = "10";
                                    else if (feeDiscount < 20) feeDiscount = "15";
                                    else if (feeDiscount < 25) feeDiscount = "20";
                                    else if (feeDiscount < 30) feeDiscount = "25";
                                    else if (feeDiscount < 35) feeDiscount = "30";
                                    else if (feeDiscount < 40) feeDiscount = "35";
                                    else if (feeDiscount < 45) feeDiscount = "40";
                                    else if (feeDiscount < 50) feeDiscount = "45";
                                    else if (feeDiscount < 55) feeDiscount - "50";
                                    else if (feeDiscount < 60) feeDiscount = "55";
                                    else if (feeDiscount < 65) feeDiscount = "60";
                                    else if (feeDiscount < 70) feeDiscount = "65";
                                    else if (feeDiscount < 75) feeDiscount = "70";
                                    else if (feeDiscount < 80) feeDiscount = "75";
                                    else if (feeDiscount >= 80) feeDiscount = "75";

                                    document.getElementById('nodeRequirement').innerHTML = "<span class='bold' style='font-size:14px;'>Stake 777k+ SVX for automatic node payouts</span>";                                   
                                    
                                    document.getElementById('svxDiscount').innerHTML = "<span class='bold' style='font-size:14px;'>Your trading fee discount for staking SVX: <span style='color:#00bb00'>" + feeDiscount + "</span> %</span>";

                                    document.getElementById('resourcesInfo').innerHTML = "<span class='bold' style='font-size:14px;'>Spend SOV to Rent CPU, NET, or buy RAM</span>";                                  

                                }


                                    var mining_multiplier_start = document.getElementById('sov_burn_amount').value;
                                    if (mining_multiplier_start < 150) mining_multiplier_start = 0;
                                    mining_multiplier_start = format_eos_amount(mining_multiplier_start);
                                    
                                    mining_multiplier = Math.log10((mining_multiplier_start / 100) / .15);

                                    var mining_rate = (svx_mining_supply / 20000) * (1 + (bonus_percentage / 100)) * mining_multiplier;
                                    mining_rate = parseFloat(mining_rate).toFixed(4);




                                    var sellsoveosMultiplierStart = document.getElementById('sov_transfer_amount').value;
                                   
                                    sellsoveosMultiplierStart = format_eos_amount(sellsoveosMultiplierStart);

                                    sellsoveosMultiplier = Math.log10((sellsoveosMultiplierStart / 200) / .15);
                                    
                                    var sellsoveosMiningRate = (svx_mining_supply / 20000) * (1 + (bonus_percentage / 100)) * sellsoveosMultiplier;

                                    if (sellsoveosMiningRate < (svx_mining_supply / 20000) * (1 + (bonus_percentage / 100))) sellsoveosMiningRate = 0;

                                    sellsoveosMiningRate = parseFloat(sellsoveosMiningRate).toFixed(4);



                                    var buysoveosMultiplierStart = document.getElementById('buysoveosBancorDiv').textContent;

                                    buysoveosMultiplierStart = format_eos_amount(buysoveosMultiplierStart)*1E4;

                                    buysoveosMultiplier = Math.log10(((buysoveosMultiplierStart/ 1e4) / 200) / .15);
                                    if (buysoveosMultiplier < 1) buysoveosMultiplier = 0;
                                    

                                    var buysoveosMiningRate = (svx_mining_supply / 20000) * (1 + (bonus_percentage / 100)) * buysoveosMultiplier;
                                    buysoveosMiningRate = parseFloat(buysoveosMiningRate).toFixed(4);


                                    var sellsovusdtMultiplierStart = document.getElementById('sov_transfer_amount10').value;
                                   
                                    sellsovusdtMultiplierStart = format_eos_amount(sellsovusdtMultiplierStart);

                                    sellsovusdtMultiplier = Math.log10((sellsovusdtMultiplierStart / 200) / .15);
                                    
                                    var sellsovusdtMiningRate = (svx_mining_supply / 20000) * (1 + (bonus_percentage / 100)) * sellsovusdtMultiplier;

                                    if (sellsovusdtMiningRate < (svx_mining_supply / 20000) * (1 + (bonus_percentage / 100))) sellsovusdtMiningRate = 0;

                                    sellsovusdtMiningRate = parseFloat(sellsovusdtMiningRate).toFixed(4);




                                    var buysovusdtMultiplierStart = document.getElementById('buysovusdtBancorDiv').textContent;

                                    buysovusdtMultiplierStart = format_eos_amount(buysovusdtMultiplierStart)*1E4;

                                    buysovusdtMultiplier = Math.log10(((buysovusdtMultiplierStart/ 1e4) / 200) / .15);
                                    if (buysovusdtMultiplier < 1) buysovusdtMultiplier = 0;
                                    

                                    var buysovusdtMiningRate = (svx_mining_supply / 20000) * (1 + (bonus_percentage / 100)) * buysovusdtMultiplier;
                                    buysovusdtMiningRate = parseFloat(buysovusdtMiningRate).toFixed(4);






                                    var myRange = document.getElementById('myRange').value;
                                    var sovBurnAmount = (document.getElementById('sov_burn_amount').value * 0.014) * myRange;
                                        sovBurnAmount = sovBurnAmount.toFixed(1);
                                    var total_mining_rate = mining_rate * myRange;
                                        total_mining_rate = total_mining_rate.toFixed(4);
                                    var miningCost = (sovBurnAmount / total_mining_rate);
                                        miningCost = miningCost.toFixed(4);

                                    document.getElementById('svxMiningRate').innerHTML = "<span class='bold' style='font-size:14px;'>Reward per Single Mining Action: <span style='color:#00bb00'>" + mining_rate + "</span> SVX</span>";

                                    document.getElementById('totalSVXMiningRate').innerHTML = "<span class='bold' style='font-size:14px;'>Total Reward per Transaction: <span style='color:#00bb00'>" + total_mining_rate + "</span> SVX</span>";

                                    document.getElementById('sellsoveosMiningRateDiv').innerHTML = "<span class='bold' style='font-size:14px;'>Reward: <span style='color:#00bb00'>" + sellsoveosMiningRate + "</span>  SVX</span>";

                                    document.getElementById('buysoveosMiningRateDiv').innerHTML = "<span class='bold' style='font-size:14px;'>Reward: <span style='color:#00bb00'>" + buysoveosMiningRate + "</span>  SVX</span>";

                                    document.getElementById('sellsovusdtMiningRateDiv').innerHTML = "<span class='bold' style='font-size:14px;'>Reward: <span style='color:#00bb00'>" + sellsovusdtMiningRate + "</span>  SVX</span>";

                                    document.getElementById('buysovusdtMiningRateDiv').innerHTML = "<span class='bold' style='font-size:14px;'>Reward: <span style='color:#00bb00'>" + buysovusdtMiningRate + "</span>  SVX</span>";

            


                                    document.getElementById('svxMiningMultiplier').innerHTML = "<span class='bold' style='font-size:14px;'>Mining Multiplier: <span style='color:orange'> " + mining_multiplier + "</span>";

                                    document.getElementById('svxMiningBurn').innerHTML = "<span class='bold' style='font-size:14px;'>Total Burn per Transaction: <span style='color:red'> " + sovBurnAmount + "</span> SOV </span>";

                                    document.getElementById('svxMiningCost').innerHTML = "<span class='bold' style='font-size:16px;'>Mining 1 SVX burns <span> " + miningCost + "</span> SOV</span>";

                                    


                                //                        document.getElementById('svx_bonus').innerHTML = "<span class='bold' style='font-size:16px;'>SVX Supply " + svx_supply + " svxpower: "+svxpower+"  bonus_percentage:"+bonus_percentage+"</span>";

                            } catch (err) {

                                initstatus = 0;
                                //                                      document.getElementById('debug').innerHTML = "ERROR " ;   

                                document.getElementById('doinit').style.visibility = "visible";
                                document.getElementById('dotransaction_bundle').style.visibility = "hidden";
                                //   return Promise.reject(err);
                            }
                            //---

                            /*  var storebalance = value.rows[0].storebalance;
                            var unstaking = value.rows[0].unstaking;
                            var unstake_time = value.rows[0].unstake_time;
                            */
                            balance_token = last * 10000;
                            
                            //document.getElementById('balance').innerHTML = "Your Balance: <span class='bold'>" + last + "</span>";
                            if (document.getElementById('svx_balance')) {
                                document.getElementById('svx_balance').innerHTML = "<span class='bold'>" + last + " SVX</span>";
                            }
                            /*
                                                if (document.getElementById('sov_liquid')) {
                                                    document.getElementById('sov_liquid').innerHTML = "<span class='bold'>" + storebalance + " stored | " + unstaking + " unstaking | " + unstake_time + " timestamp</span>";
                                                }
                            */
                        });

                    } // function getbalance()

                    // GetBalance END ------------------------

                    // GetBalance BEGIN ------------------------
                    function gettabledata() {
                        //tabledata

                        if (eosobject == null)
                            return;

                        // sovsovsov223 sovmintofeos
                        //eosobject.getTableRows( {"json": "true", "code":"eosio.token", "scope":scatter_account, "table":"accounts" } ).then
                        eosobject.getTableRows({
                            "json": "true",
                            "code": "sovmintofeos",
                            //                    "code": "sovsovsov223",

                            "scope": "SOV",
                            "table": "stat"
                        }).then(function(value) {
                                
                                sov_supply = value.rows[0].supply;

                                document.getElementById('tabledata').innerHTML = sov_supply;

                            } // value

                        );

                    } // function gettabledata()

                    // GetBalance END ------------------------

                    function change_node_click() {
                        var node = document.getElementById('scatter_host').value;

                           
                        scatter_host = node;

                        const network = ScatterJS.Network.fromJson({
                            blockchain: 'eos',
                            chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
                            host: scatter_host,
                            port: 443,
                            protocol: 'https'
                        });

                        ScatterJS.connect('sovdex', {
                            network
                        }).then(connected => {
                            if (!connected)
                                return false;
                            scatter = ScatterJS.scatter;
                            scatterobj = scatter;

                            eosobject = scatter.eos(network, Eos);

                            scatter.addEventHandler((event, payload) => {
                                
                                //alert("Jau");
                            });
                        });

                    } // change_node_click()

                    function format_eos_amount(amount) {

                        betamount = amount + "";

                        var n = betamount.indexOf(".");

                        if (n == -1) {
                            betamount = betamount + ".0000";

                            n = betamount.indexOf(".");
                        }

                        var l = betamount.length;
                        diff = l - n - 1;

                        amount2 = betamount;
                        for (i = diff; i < 4; i++)
                            amount2 += '0';

                        amount2 = parseFloat(amount2).toFixed(4);

                        return (amount2);

                    }
                    // format_eos_amount


                    function format_btc_amount(amount) {

                        betamount = amount + "";

                        var n = betamount.indexOf(".");

                        if (n == -1) {
                            betamount = betamount + ".00000000";

                            n = betamount.indexOf(".");
                        }

                        var l = betamount.length;
                        diff = l - n - 1;

                        amount2 = betamount;
                        for (i = diff; i < 8; i++)
                            amount2 += '0';

                        amount2 = parseFloat(amount2).toFixed(8);

                        return (amount2);

                    }
                    // format_pow_amount


                     
                    // format_btc_amount


                    // SCATTER BEGIN ------------------------

                    /*

                    */

                    ScatterJS.plugins(new ScatterEOS());

                    //var scatter_host = 'eos.greymass.com';
                    var scatter_host = 'api.main.alohaeos.com';
                    /*
                                const network = ScatterJS.Network.fromJson({
                                    blockchain: 'eos',
                                    chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
                    //                host: 'nodes.get-scatter.com',
                                    host: 'eos.greymass.com',
                                    port: 443,
                                    protocol: 'https'
                                });
                    */
                    const network = ScatterJS.Network.fromJson({
                        blockchain: 'eos',
                        chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
                        host: scatter_host,
                        port: 443,
                        protocol: 'https'
                    });

                    var eosobject = null;
                    var scatter_account = "";
                    var scatterobj;
                    var this_smartcontract = "";

                    function loginclick() {
                        if (scatter_account == "" || scatter_account == null) {

                            //      document.getElementById('spinnerdiv').style.visibility = "visible";
                            //    document.getElementById('buttontext').style.visibility = "hidden";
                            //document.getElementById('scatterhint').style.visibility = "hidden";

                            dologin();
                        } else {
                            //  document.getElementById('spinnerdiv').style.visibility = "visible";
                            //  document.getElementById('buttontext').style.visibility = "hidden";
                            // document.getElementById('scatterhint').style.visibility = "hidden";

                            dologout();
                        }

                    } // loginclick

                    window.dologin = async() => {

                        try {
                            console.log("dologin...");
                            await ScatterJS.login();
                            var eos = null;
                            setStatus();
                            setInterval(() => {
                                setStatus();
                            }, 1000);
                            if (scatterobj) {
                                eos = scatterobj.eos(network, Eos);
                                eosobj = eos;

                            }

                        } catch (err) {

                            //     document.getElementById('spinnerdiv').style.visibility = "hidden";
                            //    document.getElementById('buttontext').style.visibility = "visible";

                            //             document.getElementById('scatterhint').style.visibility = "visible";
                            return Promise.reject(err);
                        }

                    }

                    window.dologout = async() => {

                        try {
                            await scatter.forgetIdentity();
                            scatter_account = "";
                            console.log("Scatter logout2");
                            document.getElementById('accountname').innerHTML = "...";
                            //        document.getElementById('balance').innerHTML = "";
                            //    document.getElementById('balancesov').innerHTML = "";
                            //     document.getElementById('sov_liquid').innerHTML = "";
                            //     document.getElementById('sov_genesisinfo').innerHTML = "";

                            document.getElementById('buttontext').innerHTML = "Login ";
                            //        document.getElementById('scatterhint').style.visibility = "visible";
                        } catch (err) {

                            return Promise.reject(err);
                        }
                    }

                    // var scatter = null;
                    // var eos = null;

                    const setStatus = () => {

                        if (!scatter) {
                            return
                        }

                        // get accountname
                        const account = ScatterJS.account('eos');

                        if (account != undefined) {
                            scatter_account = account.name;

                            document.getElementById('buttontext').innerHTML = "Logout";

                            console.log(scatter_account + " is logged in");

                        } else {
                            scatter_account = "";

                            console.log("NO-ACCOUNT");
                            return
                        }

                        get_balance();

                        document.getElementById('accountname').innerHTML = "" + scatter_account;


                        document.getElementById('buttontext').style.visibility = "visible";

                    };
                    // setStatus()

                    ScatterJS.connect('svxminer', {
                        network
                    }).then(connected => {
                        if (!connected)
                            return false;
                        scatter = ScatterJS.scatter;
                        scatterobj = scatter;
                        eosobject = scatter.eos(network, Eos);
                        scatter.addEventHandler((event, payload) => {
                        });
                    });

                    dologin();
                    app_thread();

// SCATTER END ---------------------------

function showVal(val) {


                        document.getElementById('dotransaction_bundle').innerHTML = "Mine X " + val;
                        
                    } 


                    function svx_to_stake_action() {

                        var svx_store_amount = document.getElementById('svx_to_stake').value;
                        alert("Stake " + svx_store_amount + " SVX");
                        svx_store_amount = format_eos_amount(svx_store_amount);
                        svx_store_amount = svx_store_amount + " SVX";

                        eosobject.transaction({
                            actions: [{
                                account: 'svxmintofeos',
                                //      name: 'admin2',
                                name: 'stake',
                                authorization: [{
                                    actor: scatter_account,
                                    permission: "active"
                                }],
                                //     data: {"from":scatter_account,"to":receiver_account,"quantity":betamount,"memo":memo}
                                //      data: {"param": "createbet;;BIRD vs turtle;This is a description;Bird;bird;Turtle;turtle;43;123"}
                                data: {
                                    "account": scatter_account,
                                    "value": svx_store_amount
                                }

                            }]
                        }).then(result => {
                            // If Success

                            console.log("Success!!!");

                            alert('Success!');

                            return;
                        }).catch(error => {
                            console.log("jsonerr: " + error);
                            // Error details

                            err = JSON.parse(error);
                            console.log("Error Transaction " + err);

                            //  nalert('<br><div class=\'checkmark_red\'></div>Error '+err.error.name+ '!<br><br>','white');
                            alert('Error: ' + err.error.details[0].message);

                            return;

                        });

                        
                    } // svx_to_stake_action

                    function svx_to_unstake_action() {

                        var svx_unstake_amount = document.getElementById('svx_to_unstake').value;
                        alert("Unstake " + svx_unstake_amount);
                        svx_unstake_amount = format_eos_amount(svx_unstake_amount);
                        svx_unstake_amount = svx_unstake_amount + " SVX";

                        eosobject.transaction({
                            actions: [{
                                account: 'svxmintofeos',
                                //      name: 'admin2',
                                name: 'unstake',
                                authorization: [{
                                    actor: scatter_account,
                                    permission: "active"
                                }],
                                //     data: {"from":scatter_account,"to":receiver_account,"quantity":betamount,"memo":memo}
                                //      data: {"param": "createbet;;BIRD vs turtle;This is a description;Bird;bird;Turtle;turtle;43;123"}
                                data: {
                                    "account": scatter_account,
                                    "value": svx_unstake_amount
                                }

                            }]
                        }).then(result => {
                            // If Success

                            console.log("Success!!!");

                            alert('Success!');

                            return;
                        }).catch(error => {
                            console.log("jsonerr: " + error);
                            // Error details

                            err = JSON.parse(error);
                            console.log("Error Transaction " + err);

                            //  nalert('<br><div class=\'checkmark_red\'></div>Error '+err.error.name+ '!<br><br>','white');
                            alert('Error: ' + err.error.details[0].message);

                            return;

                        });


                    } 


                     function rentCPUSOV() {

                        var transfer_amount = document.getElementById('sovresourcesInput').value;
                        alert("Send " + transfer_amount + " SOV to Rent CPU");
                        transfer_amount = format_eos_amount(transfer_amount);
                        transfer_amount = transfer_amount + " SOV";

                        eosobject.transaction({
                            actions: [{
                                account: 'sovmintofeos',
                                //      name: 'admin2',
                                name: 'transfer',
                                authorization: [{
                                    actor: scatter_account,
                                    permission: "active"
                                }],
                             
                                data: {
                                    "from": scatter_account,
                                    "to": 'sovresources',
                                    "quantity": transfer_amount,
                                    "memo": 'Rent CPU'
                                }

                            }]
                        }).then(result => {
                            
                            console.log("Success!!!");

                            alert('Success!');

                            return;
                        }).catch(error => {
                            console.log("jsonerr: " + error);

                            err = JSON.parse(error);
                            console.log("Error Transaction " + err);

                            alert('Error: ' + err.error.details[0].message);

                            return;

                        });


                    } 

                    function rentNETSOV() {

                        var transfer_amount = document.getElementById('sovresourcesInput').value;
                        alert("Send " + transfer_amount + " SOV to Rent NET");
                        transfer_amount = format_eos_amount(transfer_amount);
                        transfer_amount = transfer_amount + " SOV";

                        eosobject.transaction({
                            actions: [{
                                account: 'sovmintofeos',
                                //      name: 'admin2',
                                name: 'transfer',
                                authorization: [{
                                    actor: scatter_account,
                                    permission: "active"
                                }],
                             
                                data: {
                                    "from": scatter_account,
                                    "to": 'sovresources',
                                    "quantity": transfer_amount,
                                    "memo": 'Rent NET'
                                }

                            }]
                        }).then(result => {
                            
                            console.log("Success!!!");

                            alert('Success!');

                            return;
                        }).catch(error => {
                            console.log("jsonerr: " + error);

                            err = JSON.parse(error);
                            console.log("Error Transaction " + err);

                            alert('Error: ' + err.error.details[0].message);

                            return;

                        });


                    } 

                    function buyRAMSOV() {

                        var transfer_amount = document.getElementById('sovresourcesInput').value;
                        alert("Send " + transfer_amount + " SOV to Buy RAM");
                        transfer_amount = format_eos_amount(transfer_amount);
                        transfer_amount = transfer_amount + " SOV";

                        eosobject.transaction({
                            actions: [{
                                account: 'sovmintofeos',
                                //      name: 'admin2',
                                name: 'transfer',
                                authorization: [{
                                    actor: scatter_account,
                                    permission: "active"
                                }],
                             
                                data: {
                                    "from": scatter_account,
                                    "to": 'sovresources',
                                    "quantity": transfer_amount,
                                    "memo": 'Buy RAM'
                                }

                            }]
                        }).then(result => {
                            
                            console.log("Success!!!");

                            alert('Success!');

                            return;
                        }).catch(error => {
                            console.log("jsonerr: " + error);

                            err = JSON.parse(error);
                            console.log("Error Transaction " + err);

                            alert('Error: ' + err.error.details[0].message);

                            return;

                        });


                    } 


                    function buySOVEOS() {

                        var transfer_amount = document.getElementById('eos_transfer_amount').value;
                        alert("Exchange " + transfer_amount + " EOS for SOV");
                        transfer_amount = format_eos_amount(transfer_amount);
                        transfer_amount = transfer_amount + " EOS";

                        eosobject.transaction({
                            actions: [{
                                account: 'eosio.token',
                                //      name: 'admin2',
                                name: 'transfer',
                                authorization: [{
                                    actor: scatter_account,
                                    permission: "active"
                                }],
                             
                                data: {
                                    "from": scatter_account,
                                    "to": 'sovdexrelays',
                                    "quantity": transfer_amount,
                                    "memo": 'SOV',
                                }

                            }]
                        }).then(result => {
                            
                            console.log("Success!!!");

                            alert('Success!');

                            return;
                        }).catch(error => {
                            console.log("jsonerr: " + error);

                            err = JSON.parse(error);
                            console.log("Error Transaction " + err);

                            alert('Error: ' + err.error.details[0].message);

                            return;

                        });


                    } 

                    function sellSOVEOS() {
                        
                        var transfer_amount = document.getElementById('sov_transfer_amount').value;
                        alert("Exchange " + transfer_amount + " SOV for EOS");
                        transfer_amount = format_eos_amount(transfer_amount);
                        transfer_amount = transfer_amount + " SOV";

                        eosobject.transaction({
                            actions: [{
                                account: 'sovmintofeos',
                                //      name: 'admin2',
                                name: 'transfer',
                                authorization: [{
                                    actor: scatter_account,
                                    permission: "active"
                                }],
                                //     data: {"from":scatter_account,"to":receiver_account,"quantity":betamount,"memo":memo}
                                //      data: {"param": "createbet;;BIRD vs turtle;This is a description;Bird;bird;Turtle;turtle;43;123"}
                                data: {
                                    "from": scatter_account,
                                    "to": 'sovdexrelays',
                                    "quantity": transfer_amount,
                                    "memo": 'EOS',
                                }

                            }]
                        }).then(result => {
                            // If Success

                            console.log("Success!!!");

                            alert('Success!');

                            return;
                        }).catch(error => {
                            console.log("jsonerr: " + error);
                            // Error details

                            err = JSON.parse(error);
                            console.log("Error Transaction " + err);

                            //  nalert('<br><div class=\'checkmark_red\'></div>Error '+err.error.name+ '!<br><br>','white');
                            alert('Error: ' + err.error.details[0].message);

                            return;

                        });

                    } 



                    function buySVXEOS() {

                        var transfer_amount = document.getElementById('eos_transfer_amount1').value;
                        alert("Exchange " + transfer_amount + " EOS for SVX");
                        transfer_amount = format_eos_amount(transfer_amount);
                        transfer_amount = transfer_amount + " EOS";

                        eosobject.transaction({
                            actions: [{
                                account: 'eosio.token',
                                //      name: 'admin2',
                                name: 'transfer',
                                authorization: [{
                                    actor: scatter_account,
                                    permission: "active"
                                }],
                             
                                data: {
                                    "from": scatter_account,
                                    "to": 'sovdexrelays',
                                    "quantity": transfer_amount,
                                    "memo": 'SVX',
                                }

                            }]
                        }).then(result => {
                            
                            console.log("Success!!!");

                            alert('Success!');

                            return;
                        }).catch(error => {
                            console.log("jsonerr: " + error);

                            err = JSON.parse(error);
                            console.log("Error Transaction " + err);

                            alert('Error: ' + err.error.details[0].message);

                            return;

                        });


                    } 

                    function sellSVXEOS() {
                        
                        var transfer_amount = document.getElementById('svx_transfer_amount').value;
                        alert("Exchange " + transfer_amount + " SVX for EOS");
                        transfer_amount = format_eos_amount(transfer_amount);
                        transfer_amount = transfer_amount + " SVX";

                        eosobject.transaction({
                            actions: [{
                                account: 'svxmintofeos',
                                //      name: 'admin2',
                                name: 'transfer',
                                authorization: [{
                                    actor: scatter_account,
                                    permission: "active"
                                }],
                                //     data: {"from":scatter_account,"to":receiver_account,"quantity":betamount,"memo":memo}
                                //      data: {"param": "createbet;;BIRD vs turtle;This is a description;Bird;bird;Turtle;turtle;43;123"}
                                data: {
                                    "from": scatter_account,
                                    "to": 'sovdexrelays',
                                    "quantity": transfer_amount,
                                    "memo": 'EOS',
                                }

                            }]
                        }).then(result => {
                            // If Success

                            console.log("Success!!!");

                            alert('Success!');

                            return;
                        }).catch(error => {
                            console.log("jsonerr: " + error);
                            // Error details

                            err = JSON.parse(error);
                            console.log("Error Transaction " + err);

                            //  nalert('<br><div class=\'checkmark_red\'></div>Error '+err.error.name+ '!<br><br>','white');
                            alert('Error: ' + err.error.details[0].message);

                            return;

                        });

                    }

                    function buySOVUSDT() {

                        var transfer_amount = document.getElementById('usdt_transfer_amount').value;
                        alert("Exchange " + transfer_amount + " USDT for SOV");
                        transfer_amount = format_eos_amount(transfer_amount);
                        transfer_amount = transfer_amount + " USDT";

                        eosobject.transaction({
                            actions: [{
                                account: 'tethertether',
                                //      name: 'admin2',
                                name: 'transfer',
                                authorization: [{
                                    actor: scatter_account,
                                    permission: "active"
                                }],
                             
                                data: {
                                    "from": scatter_account,
                                    "to": 'sovdexrelays',
                                    "quantity": transfer_amount,
                                    "memo": 'SOV',
                                }

                            }]
                        }).then(result => {
                            
                            console.log("Success!!!");

                            alert('Success!');

                            return;
                        }).catch(error => {
                            console.log("jsonerr: " + error);

                            err = JSON.parse(error);
                            console.log("Error Transaction " + err);

                            alert('Error: ' + err.error.details[0].message);

                            return;

                        });


                    }



                    function sellSOVUSDT() {
                        
                        var transfer_amount = document.getElementById('sov_transfer_amount10').value;
                        alert("Exchange " + transfer_amount + " SOV for USDT");
                        transfer_amount = format_eos_amount(transfer_amount);
                        transfer_amount = transfer_amount + " SOV";

                        eosobject.transaction({
                            actions: [{
                                account: 'sovmintofeos',
                                //      name: 'admin2',
                                name: 'transfer',
                                authorization: [{
                                    actor: scatter_account,
                                    permission: "active"
                                }],
                                //     data: {"from":scatter_account,"to":receiver_account,"quantity":betamount,"memo":memo}
                                //      data: {"param": "createbet;;BIRD vs turtle;This is a description;Bird;bird;Turtle;turtle;43;123"}
                                data: {
                                    "from": scatter_account,
                                    "to": 'sovdexrelays',
                                    "quantity": transfer_amount,
                                    "memo": 'USDT',
                                }

                            }]
                        }).then(result => {
                            // If Success

                            console.log("Success!!!");

                            alert('Success!');

                            return;
                        }).catch(error => {
                            console.log("jsonerr: " + error);
                            // Error details

                            err = JSON.parse(error);
                            console.log("Error Transaction " + err);

                            //  nalert('<br><div class=\'checkmark_red\'></div>Error '+err.error.name+ '!<br><br>','white');
                            alert('Error: ' + err.error.details[0].message);

                            return;

                        });

                    }

                    function buyEOSPBTC() {

                        var transfer_amount = document.getElementById('pbtc_transfer_amount').value;
                        alert("Exchange " + transfer_amount + " pBTC for EOS");
                        transfer_amount = format_btc_amount(transfer_amount);
                        transfer_amount = transfer_amount + " PBTC";

                        eosobject.transaction({
                            actions: [{
                                account: 'btc.ptokens',
                                //      name: 'admin2',
                                name: 'transfer',
                                authorization: [{
                                    actor: scatter_account,
                                    permission: "active"
                                }],
                             
                                data: {
                                    "from": scatter_account,
                                    "to": 'sovdexrelays',
                                    "quantity": transfer_amount,
                                    "memo": 'EOS',
                                }

                            }]
                        }).then(result => {
                            
                            console.log("Success!!!");

                            alert('Success!');

                            return;
                        }).catch(error => {
                            console.log("jsonerr: " + error);

                            err = JSON.parse(error);
                            console.log("Error Transaction " + err);

                            alert('Error: ' + err.error.details[0].message);

                            return;

                        });


                    }



                    function sellEOSPBTC() {
                        
                        var transfer_amount = document.getElementById('eos_transfer_amount2').value;
                        alert("Exchange " + transfer_amount + " EOS for pBTC");
                        transfer_amount = format_eos_amount(transfer_amount);
                        transfer_amount = transfer_amount + " EOS";

                        eosobject.transaction({
                            actions: [{
                                account: 'eosio.token',
                                //      name: 'admin2',
                                name: 'transfer',
                                authorization: [{
                                    actor: scatter_account,
                                    permission: "active"
                                }],
                                //     data: {"from":scatter_account,"to":receiver_account,"quantity":betamount,"memo":memo}
                                //      data: {"param": "createbet;;BIRD vs turtle;This is a description;Bird;bird;Turtle;turtle;43;123"}
                                data: {
                                    "from": scatter_account,
                                    "to": 'sovdexrelays',
                                    "quantity": transfer_amount,
                                    "memo": 'PBTC',
                                }

                            }]
                        }).then(result => {
                            // If Success

                            console.log("Success!!!");

                            alert('Success!');

                            return;
                        }).catch(error => {
                            console.log("jsonerr: " + error);
                            // Error details

                            err = JSON.parse(error);
                            console.log("Error Transaction " + err);

                            //  nalert('<br><div class=\'checkmark_red\'></div>Error '+err.error.name+ '!<br><br>','white');
                            alert('Error: ' + err.error.details[0].message);

                            return;

                        });

                    }
