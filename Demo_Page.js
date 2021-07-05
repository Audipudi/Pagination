function createtrth(elementname, value = "") {
    var td = document.createElement(elementname);
    td.innerHTML = value;
    return td;
}

var heading = document.createElement('H5');
heading.innerHTML = "DOM Pagination";

//Table Creation
var table = document.createElement('table');
table.className = "table";

//Head Creation
var thead = document.createElement('thead');
thead.className = "thead-dark";

//Headers
var tr = document.createElement('tr');
var th1 = createtrth('th', 'Id');
var th2 = createtrth('th', 'Name');
var th3 = createtrth('th', 'Email');

tr.append(th1, th2, th3);
thead.append(tr);

var tbody = document.createElement('tbody');


var req = new XMLHttpRequest();
req.open('GET', 'https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json', true);
req.send();
req.onload = function () {
    var data = JSON.parse(this.response);
    console.log(data);
    var state = {
        'queryset': data,
        'page': 1,
        'row': 10
    };
    buildtable();

    function pagination(queryset, page, row) {
        var trimstart = (page - 1) * row;
        var trimend = trimstart + row;
        var trimdata = queryset.slice(trimstart, trimend);
        var pages = Math.ceil(queryset.length / row);
        return {
            'queryset': trimdata,
            'page': pages
        }
    };
    function buildtable() {
        var temp = pagination(state.queryset, state.page, state.row);
        var mylist = temp.queryset;

        for (i = 0; i < mylist.length; i++) {
            var tr = document.createElement('tr');
            var td1 = createtrth('td', mylist[i].id);
            var td2 = createtrth('td', mylist[i].name);
            var td3 = createtrth('td', mylist[i].email);

            tr.append(td1, td2, td3);
            tbody.append(tr);

        }
    }
    
    function print(x) {
        var current= x;
        tbody.innerHTML = "";
        if (x === "First") {
            buildtable();
        }
        else if (x === "Last") {
            for (var i = (10 - 1) * 10; i < (10 * 10); i++) {
                var tr = document.createElement('tr');
                var td1 = createtrth('td', data[i].id);
                var td2 = createtrth('td', data[i].name);
                var td3 = createtrth('td', data[i].email);

                tr.append(td1, td2, td3);
                tbody.append(tr);

            }

        }
    
        else {
            for (var i = (x - 1) * 10; i < (10 * x); i++) {
                var tr = document.createElement('tr');
                var td1 = createtrth('td', data[i].id);
                var td2 = createtrth('td', data[i].name);
                var td3 = createtrth('td', data[i].email);

                tr.append(td1, td2, td3);
                tbody.append(tr);

            }
        }
        

    }
    table.append(thead, tbody);
    document.body.append(heading, table);

    var temp = [];
    var first = document.createElement('button');
    first.innerHTML = "First";
    temp.push(first);
    var prev = document.createElement('button');
    prev.innerHTML = "Prev";
    temp.push(prev);
    for (i = 1; i <= 10; i++) {
        var button = document.createElement('button');
        button.innerHTML = i;
        temp.push(button);
        document.body.append(button);
    }
    var Next = document.createElement('button');
    Next.innerHTML = "Next";
    temp.push(Next);
    var last = document.createElement('button');
    last.innerHTML = "Last";
    temp.push(last);
    document.body.append(first, prev, Next, last);

    temp.forEach((ele) => {
        ele.onclick = (function () {
            print(ele.innerHTML);
        })
    })

}



//














