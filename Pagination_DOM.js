function createtrth(elementname, value = "") {
    var td = document.createElement(elementname);
    td.innerHTML = value;
    return td;
}

var heading = document.createElement('div');
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

//var nav = document.createElement('nav');
//nav.aria-label;
//var ul = document.createElement('ul');
//ul.className = "pagination";
var data = [];
var req = new XMLHttpRequest();
req.open('GET', 'https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json', true);
req.send();
req.onload = function () {
    data = JSON.parse(this.response);
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

        table.append(thead, tbody);
        document.body.append(heading, table);
    }

    /*function cd(x) {
        table.innerHTML = "";
        for (var i = (x - 1) * 10; i < (10 * x); i++) {
            var tr = document.createElement('tr');
            var td1 = createtrth('td', data[i].id);
            var td2 = createtrth('td', data[i].name);
            var td3 = createtrth('td', data[i].email);

            tr.append(td1, td2, td3);
            tbody.append(tr);

        }

        table.append(thead, tbody);
        document.body.append(heading, table);
    }*/

    /*function pagebuttons() {
        var button = document.createElement('button');
        button.innerHTML = "Prev";
        button.addEventListener('click', buildtable);
        ul.append(button);
        for (i = 1; i <= 10; i++) {
            var button = document.createElement('button');
            button.innerHTML = i;
            button.addEventListener('click', buildtable);
            ul.append(button);
        }
        var button = document.createElement('button');
        button.innerHTML = "Next";
        button.addEventListener('click', buildtable);
        ul.append(button);
        var button = document.createElement('button');
        button.innerHTML = "First";
        button.addEventListener('click', buildtable);
        ul.append(button);
        var button = document.createElement('button');
        button.innerHTML = "Last";
        button.addEventListener('click', buildtable);
        ul.append(button);
        nav.append(ul);

    }*/
    /*pagebuttons();
    document.body.append(nav);*/
   

};

var temp = [];

for (i = 1; i <= 10; i++) {
    var button = document.createElement('button');
    button.innerHTML = i;
    //button.addEventListener('click', cd(i));
    temp.push(button);
    document.body.appendChild(button);
}

temp.forEach(ele => {
    ele.onclick(function () {
        print(ele.innerHTML);
    })
})














