app.controller("myCntrl", function ($scope, myService) {
    $scope.divBill = false;
    $scope.divMonth = false;
    $scope.tabTotal = false;
    GetAllBill();
    //To Get All Records 
    function GetAllBill() {
        debugger;
        var getData = myService.getBills();
        debugger;
        getData.then(function (bil) {
            //bil.data.date = new Date(parseInt((bil.data.date).substr(6)));
            $scope.bills = bil.data;
            //$scope.bills.title = 33;
            //new Date(parseInt(($scope.bills.date).substr(6)));
            //var date = new Date(parseInt(jsonDate.substr(6)));
        }, function () {
            alert('Error in getting records');
        });
    }

    $scope.editBill = function (bill) {
        debugger;
        var getData = myService.getBill(bill.id);
        getData.then(function (bil) {
            $scope.bill = bil.data;
            $scope.billId = bill.id;
            $scope.billDate = bill.date;
            $scope.billTitle = bill.title;
            $scope.billCategory = bill.category;
            $scope.billAmount = bill.amount;
            $scope.Action = "Update";
            $scope.divBill = true;
        },
        function () {
            alert('Error in getting records');
        });
    }

    $scope.AddUpdateBill = function () {
        debugger;
        var Bill = {
            Date: $scope.billDate,
            Title: $scope.billTitle,
            Category: $scope.billCategory,
            Amount: $scope.billAmount
        };
        var getAction = $scope.Action;

        if (getAction == "Update") {
            Bill.id = $scope.billId;
            var getData = myService.updateBil(Bill);
            getData.then(function (msg) {
                GetAllBill();
                alert(msg.data);
                $scope.divBill = false;
            }, function () {
                alert('Error in updating record');
            });
        } else {
            var getData = myService.AddBil(Bill);
            getData.then(function (msg) {
                GetAllBill();
                alert(msg.data);
                $scope.divBill = false;
            }, function () {
                alert('Error in adding record');
            });
        }
    }

    $scope.AddBillDiv = function () {
        ClearFields();
        $scope.Action = "Add";
        $scope.divBill = true;
    }

    $scope.AddMonthDiv = function () {
        $scope.divMonth = true;
    }

    $scope.Month = function (billMonth) {
        //alert(billMonth);
        $scope.tabTotal = true;
        debugger;
        var getData = myService.getTot(billMonth);
        //alert(getData);
        getData.then(function (bil) {
            $scope.bill = bil.data;
            $scope.Total = bill.amount;
            //$scope.Total = 32;
            //alert(bill.amount);
        },
        function () {
            alert('Error in getting monthly summary');
        });
       /* var total = 0;
        if(billMonth==bill.date)
        {
            $scope.total = $scope.total + bill.Amount;
        }*/
    }

    $scope.getTotal = function (billMonth) {
        var total = 0;
        for (var i = 0; i < $scope.bills.length; i++) {
            var b = $scope.bills[i];
            if (b.date == billMonth) {
                total += (b.amount);
            }
        }
        return total;
    }

    $scope.deleteBill = function (bill) {
        var getData = myService.DeleteBil(bill);
        getData.then(function (msg) {
            GetAllBill();
            alert('Bill Deleted');
        }, function () {
            alert('Error in Deleting Record');
        });
    }

    function ClearFields() {
        $scope.billId = "";
        $scope.billDate = "";
        $scope.billTitle = "";
        $scope.billCategory = "";
        $scope.billAmount = "";
    }
});