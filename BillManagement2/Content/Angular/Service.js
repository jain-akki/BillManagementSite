app.service("myService", function ($http) {

    //get All Bills
    this.getBills = function () {
        debugger;
        return $http.get("Home/GetAll");
    };

    // get Bill By Id
    this.getBill = function (billId) {
        var response = $http({
            method: "post",
            url: "Home/getBillByNo",
            params: {
                id: JSON.stringify(billId)
            }
        });
        return response;
    }

    // Update Bill
    this.updateBil = function (bill) {
        var response = $http({
            method: "post",
            url: "Home/UpdateBill",
            data: JSON.stringify(bill),
            dataType: "json"
        });
        return response;
    }

    // Add Bill
    this.AddBil = function (bill) {
        var response = $http({
            method: "post",
            url: "Home/AddBill",
            data: JSON.stringify(bill),
            dataType: "json"
        });
        return response;
    }

    //Monthly Summary
    this.getTot = function (billMonth) {
        /*var response = $http({
            method: "post",
            url: "Home/getTotal",
            data: JSON.stringify(billMonth),
            dataType: "json"
        });*/
        debugger;
        return $http.get("Home/getTotal");
        return response;
    }

    //Delete Bill
    this.DeleteBil = function (bill) {
        var response = $http({
            method: "post",
            url: "Home/DeleteBill",
            data: JSON.stringify(bill),
            dataType: "json"
            // params: {
             //   id: JSON.stringify(bill)
            //}
        });
        return response;
    }
});