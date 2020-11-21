using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Microsoft.AspNetCore.Mvc;
using MySql;
using MySql.Data.MySqlClient;

namespace ApiMicroservicios3.Controllers


{
    [ApiController]
    [Route("[controller]")]
    public class InformacionBasicaController : Controller
    {
        private string _connection = @"Server=localhost; Database=descripcion_producto; Uid=root";

        [HttpGet]

        public IActionResult Get()
        {

            IEnumerable<Models.BasicProductInfo> lst = null;
            using (var db = new MySqlConnection(_connection))
            {
                var sql = "select idinformacion_basica,informacion_descripcion,informacion_marca,informacion_idcolor,informacion_idpeso from informacion_basica";
                lst = db.Query<Models.BasicProductInfo>(sql);
            }

            return Ok(lst);
                
        }

        
    }
}
