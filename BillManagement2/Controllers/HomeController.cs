using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BillManagement2.Models;

namespace BillManagementApplication.Controllers
{
    public class HomeController : Controller
    {
        //
        // GET: /Home/

        public ActionResult Index()
        {
            return View();
        }

        public JsonResult getAll()
        {
            using (BillDBEntities dataContext = new BillDBEntities())
            {
                var billList = dataContext.Bills.ToList();
                return Json(billList, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult getBillByNo(string BillNo)
        {
            using (BillDBEntities dataContext = new BillDBEntities())
            {
                int no = Convert.ToInt32(BillNo);
                var billList = dataContext.Bills.Find(no);
                return Json(billList, JsonRequestBehavior.AllowGet);
            }
        }
        
        public string UpdateBill(Bill bil)
        {
            if (bil != null)
            {
                using (BillDBEntities dataContext = new BillDBEntities())
                {
                    int no = Convert.ToInt32(bil.id);
                    var billList = dataContext.Bills.Where(x => x.id == no).FirstOrDefault();
                    billList.date = bil.date;
                    billList.title = bil.title;
                    billList.category = bil.category;
                    billList.amount = bil.amount;
                    dataContext.SaveChanges();
                    return "Bills Updated";
                }
            }
            else
            {
                return "Invalid Bill";
            }
        }
        public string AddBill(Bill bil)
        {
            if (bil != null)
            {
                using (BillDBEntities dataContext = new BillDBEntities())
                {
                    dataContext.Bills.Add(bil);
                    dataContext.SaveChanges();
                    return "Bills Updated";
                }
            }
            else
            {
                return "Invalid Bill";
            }
        }

        public JsonResult getTotal(string billMonth)
        {
            using (BillDBEntities dataContext = new BillDBEntities())
            {
                string mon = billMonth;
                var billList = dataContext.Bills.Where(x => x.date == mon).FirstOrDefault();
                return Json(billList, JsonRequestBehavior.AllowGet);
            }
        }

        public string DeleteBill(Bill bil)
        {
            if (bil != null)
            {
                using (BillDBEntities dataContext = new BillDBEntities())
                {
                    int no = Convert.ToInt32(bil.id);
                    //var billList = dataContext.Bills.Find(no);
                    var billList = dataContext.Bills.Where(x => x.id == no).FirstOrDefault();
                    dataContext.Bills.Remove(billList);
                    dataContext.SaveChanges();
                    return "Bill Deleted";
                }
            }
            else
            {
                return "Invalid Bill";
            }
        }

    }
}
