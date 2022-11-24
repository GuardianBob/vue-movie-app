var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// db_2/config/config.json
var require_config = __commonJS({
  "db_2/config/config.json"(exports, module2) {
    module2.exports = {
      development: {
        dialect: "sqlite",
        storage: "../MovieDB.sqlite3",
        database: "../MovieDB.sqlite3",
        port: 3e3
      },
      test: {
        dialect: "sqlite",
        storage: "./MovieDB.sqlite3",
        database: "MovieDB.sqlite3"
      },
      production: {
        dialect: "sqlite",
        storage: "./MovieDB.sqlite3",
        database: "MovieDB.sqlite3"
      }
    };
  }
});

// db_2/models/movie.model.js
var require_movie_model = __commonJS({
  "db_2/models/movie.model.js"(exports, module2) {
    module2.exports = (sequelize, Sequelize) => {
      const movie = sequelize.define(
        "movies",
        {
          tmdb_id: {
            type: Sequelize.INTEGER
          },
          title: {
            type: Sequelize.TEXT
          },
          own: {
            type: Sequelize.INTEGER
          },
          nas: {
            type: Sequelize.INTEGER
          },
          watched: {
            type: Sequelize.INTEGER
          },
          not_watched: {
            type: Sequelize.INTEGER
          }
        },
        {
          freezeTableName: true,
          createdAt: true,
          updatedAt: true
        }
      );
      return movie;
    };
  }
});

// db_2/models/index.js
var require_models = __commonJS({
  "db_2/models/index.js"(exports, module2) {
    "use strict";
    var fs = require("fs");
    var path2 = require("path");
    var Sequelize = require("sequelize");
    var { LIMIT_COMPOUND_SELECT } = require("sqlite3");
    var basename = path2.basename(__filename);
    var env = "development";
    var config = require_config()[env];
    var db = {};
    var SQLite = require("sqlite3");
    var sequelize = new Sequelize("MovieDB", null, null, {
      dialect: "sqlite",
      storage: "../MovieDB.sqlite3",
      dialectOptions: {
        mode: SQLite.OPEN_READWRITE
      }
    });
    db.sequelize = sequelize;
    db.Sequelize = Sequelize;
    db.movie = require_movie_model()(sequelize, Sequelize.DataTypes);
    module2.exports = db;
  }
});

// db_2/controllers/movie.controller.js
var require_movie_controller = __commonJS({
  "db_2/controllers/movie.controller.js"(exports) {
    var db = require_models();
    var Op = db.Sequelize.Op;
    var { Sequelize } = require("sequelize");
    var { QueryTypes } = require("sequelize");
    var { movie } = require_models();
    var SQLite = require("sqlite3");
    var sequelize = new Sequelize("MovieDB", null, null, {
      dialect: "sqlite",
      storage: "../MovieDB.sqlite3",
      dialectOptions: {
        mode: SQLite.OPEN_READWRITE
      }
    });
    exports.test_add = async (req, res) => {
      try {
        console.log(req.params, req.query, req.body);
        console.log("hit the new controller!");
        res.send("Backend connection success!");
      } catch (error) {
        console.log(`Error: ${error}`);
      }
    };
  }
});

// db_2/server.js
var require_server = __commonJS({
  "db_2/server.js"() {
    var express = require("express");
    var bodyParser = require("body-parser");
    var db = require_models();
    var movie = require_movie_controller();
    var cors = require("cors");
    var api2 = express();
    console.log("reached server.js");
    var corsOptions = {
      exposedHeaders: ["refresh-token"],
      origin: "*",
      allowedHeaders: [
        "Origin",
        "X-Requested-With",
        "Content-Type",
        "Accept",
        "Access-Control",
        "Authorization",
        "Cache-Control",
        "Content-Language",
        "Expires",
        "Last-Modified",
        "Pragma",
        "x-Access-Token",
        "Access-Control-Allow-Origin"
      ],
      crossdomain: true
    };
    api2.use(cors(corsOptions));
    api2.use(bodyParser.json());
    api2.use(bodyParser.urlencoded({ extended: false }));
    api2.get("/", (req, res) => {
      console.log("hit the server");
    });
    api2.post(
      "/db/movie/test_add",
      movie.test_add
    );
    var server = api2.listen(3e3, () => console.log(`Express server listening on port 3000`));
  }
});

// src-electron/electron-main.js
var import_electron = require("electron");
var import_path = __toESM(require("path"));
var import_os = __toESM(require("os"));
var import_server = __toESM(require_server());
var platform = process.platform || import_os.default.platform();
try {
  if (platform === "win32" && import_electron.nativeTheme.shouldUseDarkColors === true) {
    require("fs").unlinkSync(import_path.default.join(import_electron.app.getPath("userData"), "DevTools Extensions"));
  }
} catch (_) {
}
var mainWindow;
function createWindow() {
  mainWindow = new import_electron.BrowserWindow({
    icon: import_path.default.resolve(__dirname, "icons/icon.png"),
    width: 1500,
    height: 800,
    useContentSize: true,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: true,
      preload: import_path.default.resolve(__dirname, "D:\\Documents\\Coding\\Vue\\vue-electron-desktop-app\\movie-app\\.quasar\\electron\\electron-preload.js")
    }
  });
  mainWindow.loadURL("http://localhost:9300").then(() => {
    if (true) {
      mainWindow.webContents.openDevTools();
    } else {
      mainWindow.webContents.on("devtools-opened", () => {
        mainWindow.webContents.closeDevTools();
      });
    }
  });
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}
import_electron.app.whenReady().then(createWindow);
import_electron.app.on("window-all-closed", () => {
  if (platform !== "darwin") {
    import_electron.app.quit();
  }
});
import_electron.app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vZGJfMi9tb2RlbHMvbW92aWUubW9kZWwuanMiLCAiLi4vLi4vZGJfMi9tb2RlbHMvaW5kZXguanMiLCAiLi4vLi4vZGJfMi9jb250cm9sbGVycy9tb3ZpZS5jb250cm9sbGVyLmpzIiwgIi4uLy4uL2RiXzIvc2VydmVyLmpzIiwgIi4uLy4uL3NyYy1lbGVjdHJvbi9lbGVjdHJvbi1tYWluLmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJtb2R1bGUuZXhwb3J0cyA9IChzZXF1ZWxpemUsIFNlcXVlbGl6ZSkgPT4ge1xyXG4gIGNvbnN0IG1vdmllID0gc2VxdWVsaXplLmRlZmluZShcclxuICAgIFwibW92aWVzXCIsXHJcbiAgICB7XHJcbiAgICAgIHRtZGJfaWQ6IHtcclxuICAgICAgICB0eXBlOiBTZXF1ZWxpemUuSU5URUdFUlxyXG4gICAgICB9LFxyXG4gICAgICB0aXRsZToge1xyXG4gICAgICAgIHR5cGU6IFNlcXVlbGl6ZS5URVhUXHJcbiAgICAgIH0sXHJcbiAgICAgIG93bjoge1xyXG4gICAgICAgIHR5cGU6IFNlcXVlbGl6ZS5JTlRFR0VSXHJcbiAgICAgIH0sXHJcbiAgICAgIG5hczoge1xyXG4gICAgICAgIHR5cGU6IFNlcXVlbGl6ZS5JTlRFR0VSXHJcbiAgICAgIH0sXHJcbiAgICAgIHdhdGNoZWQ6IHtcclxuICAgICAgICB0eXBlOiBTZXF1ZWxpemUuSU5URUdFUlxyXG4gICAgICB9LFxyXG4gICAgICBub3Rfd2F0Y2hlZDoge1xyXG4gICAgICAgIHR5cGU6IFNlcXVlbGl6ZS5JTlRFR0VSXHJcbiAgICAgIH0sXHJcbiAgICAgIC8vIGNyZWF0ZWRfYXQ6IHtcclxuICAgICAgLy8gICB0eXBlOiBTZXF1ZWxpemUuVEVYVFxyXG4gICAgICAvLyB9LFxyXG4gICAgICAvLyB1cGRhdGVkX2F0OiB7XHJcbiAgICAgIC8vICAgdHlwZTogU2VxdWVsaXplLlRFWFRcclxuICAgICAgLy8gfSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIC8vIHNjaGVtYTogXCJtb3ZpZXNcIixcclxuICAgICAgZnJlZXplVGFibGVOYW1lOiB0cnVlLFxyXG4gICAgICBjcmVhdGVkQXQ6IHRydWUsXHJcbiAgICAgIHVwZGF0ZWRBdDogdHJ1ZSxcclxuICAgIH1cclxuICApO1xyXG4gIHJldHVybiBtb3ZpZTtcclxufSIsICIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGZzID0gcmVxdWlyZSgnZnMnKTtcbmNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJyk7XG5jb25zdCBTZXF1ZWxpemUgPSByZXF1aXJlKCdzZXF1ZWxpemUnKTtcbmNvbnN0IHsgTElNSVRfQ09NUE9VTkRfU0VMRUNUIH0gPSByZXF1aXJlKCdzcWxpdGUzJyk7XG4vLyBjb25zdCBwcm9jZXNzID0gcmVxdWlyZSgncHJvY2VzcycpO1xuY29uc3QgYmFzZW5hbWUgPSBwYXRoLmJhc2VuYW1lKF9fZmlsZW5hbWUpO1xuY29uc3QgZW52ID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgfHwgJ2RldmVsb3BtZW50JztcbmNvbnN0IGNvbmZpZyA9IHJlcXVpcmUoJy4uL2NvbmZpZy9jb25maWcuanNvbicpW2Vudl07XG5jb25zdCBkYiA9IHt9O1xuY29uc3QgU1FMaXRlID0gcmVxdWlyZShcInNxbGl0ZTNcIik7XG5cblxuXG4vLyBsZXQgc2VxdWVsaXplO1xuLy8gaWYgKGNvbmZpZy51c2VfZW52X3ZhcmlhYmxlKSB7XG4vLyAgIHNlcXVlbGl6ZSA9IG5ldyBTZXF1ZWxpemUocHJvY2Vzcy5lbnZbY29uZmlnLnVzZV9lbnZfdmFyaWFibGVdLCBjb25maWcpO1xuLy8gfSBlbHNlIHtcbi8vICAgc2VxdWVsaXplID0gbmV3IFNlcXVlbGl6ZShjb25maWcuZGF0YWJhc2UsIG51bGwsIG51bGwsIGNvbmZpZyk7XG4vLyB9XG5cblxuY29uc3Qgc2VxdWVsaXplID0gbmV3IFNlcXVlbGl6ZSgnTW92aWVEQicsIG51bGwsIG51bGwsIHtcbiAgZGlhbGVjdDogJ3NxbGl0ZScsXG4gIHN0b3JhZ2U6ICcuLi9Nb3ZpZURCLnNxbGl0ZTMnLCAvLyBvciAnOm1lbW9yeTonXG4gIGRpYWxlY3RPcHRpb25zOiB7XG4gICAgLy8gWW91ciBzcWxpdGUzIG9wdGlvbnMgaGVyZVxuICAgIC8vIGZvciBpbnN0YW5jZSwgdGhpcyBpcyBob3cgeW91IGNhbiBjb25maWd1cmUgdGhlIGRhdGFiYXNlIG9wZW5pbmcgbW9kZTpcbiAgICAvLyBtb2RlOiBTUUxpdGUuT1BFTl9SRUFEV1JJVEUgfCBTUUxpdGUuT1BFTl9DUkVBVEUgfCBTUUxpdGUuT1BFTl9GVUxMTVVURVgsXG4gICAgbW9kZTogU1FMaXRlLk9QRU5fUkVBRFdSSVRFXG4gIH0sXG59KTtcblxuLy8gY29uc29sZS5sb2coJ3NlcXVlbGl6ZTogJywgc2VxdWVsaXplKVxuLy8gZnNcbi8vICAgLnJlYWRkaXJTeW5jKF9fZGlybmFtZSlcbi8vICAgLmZpbHRlcihmaWxlID0+IHtcbi8vICAgICByZXR1cm4gKGZpbGUuaW5kZXhPZignLicpICE9PSAwKSAmJiAoZmlsZSAhPT0gYmFzZW5hbWUpICYmIChmaWxlLnNsaWNlKC0zKSA9PT0gJy5qcycpO1xuLy8gICB9KVxuLy8gICAuZm9yRWFjaChmaWxlID0+IHtcbi8vICAgICBjb25zdCBtb2RlbCA9IHJlcXVpcmUocGF0aC5qb2luKF9fZGlybmFtZSwgZmlsZSkpKHNlcXVlbGl6ZSwgU2VxdWVsaXplLkRhdGFUeXBlcyk7XG4vLyAgICAgZGJbbW9kZWwubmFtZV0gPSBtb2RlbDtcbi8vICAgfSk7XG5cbi8vIE9iamVjdC5rZXlzKGRiKS5mb3JFYWNoKG1vZGVsTmFtZSA9PiB7XG4vLyAgIGlmIChkYlttb2RlbE5hbWVdLmFzc29jaWF0ZSkge1xuLy8gICAgIGRiW21vZGVsTmFtZV0uYXNzb2NpYXRlKGRiKTtcbi8vICAgfVxuLy8gfSk7XG5cbmRiLnNlcXVlbGl6ZSA9IHNlcXVlbGl6ZTtcbmRiLlNlcXVlbGl6ZSA9IFNlcXVlbGl6ZTtcblxuZGIubW92aWUgPSByZXF1aXJlKFwiLi9tb3ZpZS5tb2RlbC5qc1wiKShzZXF1ZWxpemUsIFNlcXVlbGl6ZS5EYXRhVHlwZXMpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGRiO1xuIiwgImNvbnN0IGRiID0gcmVxdWlyZShcIi4uL21vZGVsc1wiKTtcclxuY29uc3QgT3AgPSBkYi5TZXF1ZWxpemUuT3A7XHJcbmNvbnN0IHsgU2VxdWVsaXplIH0gPSByZXF1aXJlKFwic2VxdWVsaXplXCIpO1xyXG5jb25zdCB7IFF1ZXJ5VHlwZXMgfSA9IHJlcXVpcmUoXCJzZXF1ZWxpemVcIik7XHJcbmNvbnN0IHsgbW92aWUgfSA9IHJlcXVpcmUoXCIuLi9tb2RlbHNcIik7XHJcbmNvbnN0IFNRTGl0ZSA9IHJlcXVpcmUoXCJzcWxpdGUzXCIpO1xyXG5cclxuY29uc3Qgc2VxdWVsaXplID0gbmV3IFNlcXVlbGl6ZSgnTW92aWVEQicsIG51bGwsIG51bGwsIHtcclxuICBkaWFsZWN0OiAnc3FsaXRlJyxcclxuICBzdG9yYWdlOiAnLi4vTW92aWVEQi5zcWxpdGUzJywgLy8gb3IgJzptZW1vcnk6J1xyXG4gIGRpYWxlY3RPcHRpb25zOiB7XHJcbiAgICAvLyBZb3VyIHNxbGl0ZTMgb3B0aW9ucyBoZXJlXHJcbiAgICAvLyBmb3IgaW5zdGFuY2UsIHRoaXMgaXMgaG93IHlvdSBjYW4gY29uZmlndXJlIHRoZSBkYXRhYmFzZSBvcGVuaW5nIG1vZGU6XHJcbiAgICAvLyBtb2RlOiBTUUxpdGUuT1BFTl9SRUFEV1JJVEUgfCBTUUxpdGUuT1BFTl9DUkVBVEUgfCBTUUxpdGUuT1BFTl9GVUxMTVVURVgsXHJcbiAgICBtb2RlOiBTUUxpdGUuT1BFTl9SRUFEV1JJVEVcclxuICB9LFxyXG59KTtcclxuXHJcbmV4cG9ydHMudGVzdF9hZGQgPSBhc3luYyAocmVxLCByZXMpID0+IHtcclxuICB0cnkge1xyXG4gICAgY29uc29sZS5sb2cocmVxLnBhcmFtcywgcmVxLnF1ZXJ5LCByZXEuYm9keSk7XHJcbiAgICBjb25zb2xlLmxvZyhcImhpdCB0aGUgbmV3IGNvbnRyb2xsZXIhXCIpO1xyXG4gICAgLy8gY29uc29sZS5sb2coJ3RyeWluZyB0byBjb25uZWN0IGRiOiAnLCBkYik7XHJcbiAgICAvLyBjb25zdCBuZXdfbW92aWUgPSBhd2FpdCBtb3ZpZS5jcmVhdGUoeyB0aXRsZTogcmVxLmJvZHkudGl0bGUgfSk7IFxyXG5cclxuICAgIFxyXG4gICAgcmVzLnNlbmQoXCJCYWNrZW5kIGNvbm5lY3Rpb24gc3VjY2VzcyFcIik7XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIGNvbnNvbGUubG9nKGBFcnJvcjogJHtlcnJvcn1gKVxyXG4gIH1cclxufTtcclxuIiwgInZhciBleHByZXNzID0gcmVxdWlyZShcImV4cHJlc3NcIik7XHJcbnZhciBib2R5UGFyc2VyID0gcmVxdWlyZShcImJvZHktcGFyc2VyXCIpO1xyXG5jb25zdCBkYiA9IHJlcXVpcmUoJy4vbW9kZWxzJyk7XHJcbmNvbnN0IG1vdmllID0gcmVxdWlyZShcIi4vY29udHJvbGxlcnMvbW92aWUuY29udHJvbGxlclwiKTtcclxuY29uc3QgY29ycyA9IHJlcXVpcmUoJ2NvcnMnKTtcclxuXHJcblxyXG5jb25zdCBhcGkgPSBleHByZXNzKCk7XHJcbmNvbnNvbGUubG9nKCdyZWFjaGVkIHNlcnZlci5qcycpXHJcblxyXG52YXIgY29yc09wdGlvbnMgPSB7XHJcbiAgZXhwb3NlZEhlYWRlcnM6IFsncmVmcmVzaC10b2tlbiddLFxyXG4gIG9yaWdpbjogJyonLFxyXG4gIGFsbG93ZWRIZWFkZXJzOiBbXHJcbiAgICAnT3JpZ2luJyxcclxuICAgICdYLVJlcXVlc3RlZC1XaXRoJyxcclxuICAgICdDb250ZW50LVR5cGUnLFxyXG4gICAgJ0FjY2VwdCcsXHJcbiAgICAnQWNjZXNzLUNvbnRyb2wnLFxyXG4gICAgJ0F1dGhvcml6YXRpb24nLFxyXG4gICAgJ0NhY2hlLUNvbnRyb2wnLFxyXG4gICAgJ0NvbnRlbnQtTGFuZ3VhZ2UnLFxyXG4gICAgJ0V4cGlyZXMnLFxyXG4gICAgJ0xhc3QtTW9kaWZpZWQnLFxyXG4gICAgJ1ByYWdtYScsXHJcbiAgICAneC1BY2Nlc3MtVG9rZW4nLFxyXG4gICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbicsXHJcbiAgXSxcclxuICBjcm9zc2RvbWFpbjogdHJ1ZSxcclxuICAvLyBtZXRob2RzOiBbJ0dFVCcsJ1BPU1QnLCdERUxFVEUnLCdVUERBVEUnLCdQVVQnLCdQQVRDSCddLFxyXG4gIC8vIGNyZWRlbnRpYWxzOiB0cnVlXHJcbn07XHJcbmFwaS51c2UoY29ycyhjb3JzT3B0aW9ucykpO1xyXG5hcGkudXNlKGJvZHlQYXJzZXIuanNvbigpKTtcclxuYXBpLnVzZShib2R5UGFyc2VyLnVybGVuY29kZWQoeyBleHRlbmRlZDogZmFsc2UgfSkpO1xyXG4vLyByZXF1aXJlKCcuL3JvdXRlcy9tb3ZpZS5yb3V0ZXMnKShhcGkpO1xyXG5cclxuYXBpLmdldCgnLycsIChyZXEsIHJlcykgPT4ge1xyXG4gIC8vIHJlcy5zZW5kKCdXb3JraW5nJyk7XHJcbiAgY29uc29sZS5sb2coJ2hpdCB0aGUgc2VydmVyJylcclxufSk7XHJcblxyXG5hcGkucG9zdChcclxuICAgIFwiL2RiL21vdmllL3Rlc3RfYWRkXCIsXHJcbiAgICAvLyBbYXV0aEp3dC52ZXJpZnlUb2tlbl0sXHJcbiAgICAvLyBjb25zb2xlLmxvZyhcIm1hZGUgaXQgdG8gdGhlIHJvdXRlcyBmaWxlLi4uXCIpLFxyXG4gICAgbW92aWUudGVzdF9hZGRcclxuICApO1xyXG5cclxubGV0IHNlcnZlciA9IGFwaS5saXN0ZW4oMzAwMCwgKCkgPT4gY29uc29sZS5sb2coYEV4cHJlc3Mgc2VydmVyIGxpc3RlbmluZyBvbiBwb3J0IDMwMDBgKSk7IiwgImltcG9ydCB7IGFwcCwgQnJvd3NlcldpbmRvdywgbmF0aXZlVGhlbWUgfSBmcm9tICdlbGVjdHJvbidcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5pbXBvcnQgb3MgZnJvbSAnb3MnXG5pbXBvcnQgYXBpIGZyb20gJy4uL2RiXzIvc2VydmVyJ1xuXG4vLyBuZWVkZWQgaW4gY2FzZSBwcm9jZXNzIGlzIHVuZGVmaW5lZCB1bmRlciBMaW51eFxuY29uc3QgcGxhdGZvcm0gPSBwcm9jZXNzLnBsYXRmb3JtIHx8IG9zLnBsYXRmb3JtKClcblxuLy8gY29uc3Qgc2VydmVyID0gcmVxdWlyZSgnLi4vZGIvaW5kZXgnKTtcblxudHJ5IHtcbiAgaWYgKHBsYXRmb3JtID09PSAnd2luMzInICYmIG5hdGl2ZVRoZW1lLnNob3VsZFVzZURhcmtDb2xvcnMgPT09IHRydWUpIHtcbiAgICByZXF1aXJlKCdmcycpLnVubGlua1N5bmMocGF0aC5qb2luKGFwcC5nZXRQYXRoKCd1c2VyRGF0YScpLCAnRGV2VG9vbHMgRXh0ZW5zaW9ucycpKVxuICB9XG59IGNhdGNoIChfKSB7IH1cblxubGV0IG1haW5XaW5kb3dcblxuZnVuY3Rpb24gY3JlYXRlV2luZG93ICgpIHtcbiAgLyoqXG4gICAqIEluaXRpYWwgd2luZG93IG9wdGlvbnNcbiAgICovXG4gIG1haW5XaW5kb3cgPSBuZXcgQnJvd3NlcldpbmRvdyh7XG4gICAgaWNvbjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ2ljb25zL2ljb24ucG5nJyksIC8vIHRyYXkgaWNvblxuICAgIHdpZHRoOiAxNTAwLFxuICAgIGhlaWdodDogODAwLFxuICAgIHVzZUNvbnRlbnRTaXplOiB0cnVlLFxuICAgIHdlYlByZWZlcmVuY2VzOiB7XG4gICAgICBjb250ZXh0SXNvbGF0aW9uOiB0cnVlLFxuICAgICAgbm9kZUludGVncmF0aW9uOiB0cnVlLFxuICAgICAgLy8gTW9yZSBpbmZvOiBodHRwczovL3YyLnF1YXNhci5kZXYvcXVhc2FyLWNsaS12aXRlL2RldmVsb3BpbmctZWxlY3Ryb24tYXBwcy9lbGVjdHJvbi1wcmVsb2FkLXNjcmlwdFxuICAgICAgcHJlbG9hZDogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgcHJvY2Vzcy5lbnYuUVVBU0FSX0VMRUNUUk9OX1BSRUxPQUQpXG4gICAgfVxuICB9KVxuXG4gIG1haW5XaW5kb3cubG9hZFVSTChwcm9jZXNzLmVudi5BUFBfVVJMKS50aGVuKCgpID0+IHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuREVCVUdHSU5HKSB7XG4gICAgICAvLyBpZiBvbiBERVYgb3IgUHJvZHVjdGlvbiB3aXRoIGRlYnVnIGVuYWJsZWRcbiAgICAgICAgbWFpbldpbmRvdy53ZWJDb250ZW50cy5vcGVuRGV2VG9vbHMoKVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyB3ZSdyZSBvbiBwcm9kdWN0aW9uOyBubyBhY2Nlc3MgdG8gZGV2dG9vbHMgcGxzXG4gICAgICBtYWluV2luZG93LndlYkNvbnRlbnRzLm9uKCdkZXZ0b29scy1vcGVuZWQnLCAoKSA9PiB7XG4gICAgICAgIG1haW5XaW5kb3cud2ViQ29udGVudHMuY2xvc2VEZXZUb29scygpXG4gICAgICB9KVxuICAgIH1cbiAgICBcbiAgfSlcblxuXG4gIG1haW5XaW5kb3cub24oJ2Nsb3NlZCcsICgpID0+IHtcbiAgICBtYWluV2luZG93ID0gbnVsbFxuICB9KVxufVxuXG5hcHAud2hlblJlYWR5KCkudGhlbihjcmVhdGVXaW5kb3cpXG5cbmFwcC5vbignd2luZG93LWFsbC1jbG9zZWQnLCAoKSA9PiB7XG4gIGlmIChwbGF0Zm9ybSAhPT0gJ2RhcndpbicpIHtcbiAgICBhcHAucXVpdCgpXG4gIH1cbn0pXG5cbmFwcC5vbignYWN0aXZhdGUnLCAoKSA9PiB7XG4gIFxuICBpZiAobWFpbldpbmRvdyA9PT0gbnVsbCkge1xuICAgIGNyZWF0ZVdpbmRvdygpXG4gIH1cbn0pXG5cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQSx3Q0FBQUEsU0FBQTtBQUFBLElBQUFBLFFBQU8sVUFBVSxDQUFDLFdBQVcsY0FBYztBQUN6QyxZQUFNLFFBQVEsVUFBVTtBQUFBLFFBQ3RCO0FBQUEsUUFDQTtBQUFBLFVBQ0UsU0FBUztBQUFBLFlBQ1AsTUFBTSxVQUFVO0FBQUEsVUFDbEI7QUFBQSxVQUNBLE9BQU87QUFBQSxZQUNMLE1BQU0sVUFB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VSxNQUFNLENBQUMsQ0FBQztBQUdsRCxJQUFBQSxLQUFJLElBQUksS0FBSyxDQUFDLEtBQUssUUFBUTtBQUV6QixjQUFRLElBQUksZ0JBQWdCO0FBQUEsSUFDOUIsQ0FBQztBQUVELElBQUFBLEtBQUk7QUFBQSxNQUNBO0FBQUEsTUFHQSxNQUFNO0FBQUEsSUFDUjtBQUVGLFFBQUksU0FBU0EsS0FBSSxPQUFPLEtBQU0sTUFBTSxRQUFRLElBQUksdUNBQXVDLENBQUM7QUFBQTtBQUFBOzs7QUNqRHhGLHNCQUFnRDtBQUNoRCxrQkFBaUI7QUFDakIsZ0JBQWU7QUFDZixvQkFBZ0I7QUFHaEIsSUFBTSxXQUFXLFFBQVEsWUFBWSxVQUFBQyxRQUFHLFNBQVM7QUFJakQsSUFBSTtBQUNGLE1BQUksYUFBYSxXQUFXLDRCQUFZLHdCQUF3QixNQUFNO0FBQ3BFLFlBQVEsTUFBTSxXQUFXLFlBQUFDLFFBQUssS0FBSyxvQkFBSSxRQUFRLFVBQVUsR0FBRyxxQkFBcUIsQ0FBQztBQUFBLEVBQ3BGO0FBQ0YsU0FBUyxHQUFQO0FBQVk7QUFFZCxJQUFJO0FBRUosU0FBUyxlQUFnQjtBQUl2QixlQUFhLElBQUksOEJBQWM7QUFBQSxJQUM3QixNQUFNLFlBQUFBLFFBQUssUUFBUSxXQUFXLGdCQUFnQjtBQUFBLElBQzlDLE9BQU87QUFBQSxJQUNQLFFBQVE7QUFBQSxJQUNSLGdCQUFnQjtBQUFBLElBQ2hCLGdCQUFnQjtBQUFBLE1BQ2Qsa0JBQWtCO0FBQUEsTUFDbEIsaUJBQWlCO0FBQUEsTUFFakIsU0FBUyxZQUFBQSxRQUFLLFFBQVEsV0FBVyx5R0FBbUM7QUFBQSxJQUN0RTtBQUFBLEVBQ0YsQ0FBQztBQUVELGFBQVcsUUFBUSx1QkFBbUIsRUFBRSxLQUFLLE1BQU07QUFDakQsUUFBSSxNQUF1QjtBQUV2QixpQkFBVyxZQUFZLGFBQWE7QUFBQSxJQUN4QyxPQUFPO0FBRUwsaUJBQVcsWUFBWSxHQUFHLG1CQUFtQixNQUFNO0FBQ2pELG1CQUFXLFlBQVksY0FBYztBQUFBLE1BQ3ZDLENBQUM7QUFBQSxJQUNIO0FBQUEsRUFFRixDQUFDO0FBR0QsYUFBVyxHQUFHLFVBQVUsTUFBTTtBQUM1QixpQkFBYTtBQUFBLEVBQ2YsQ0FBQztBQUNIO0FBRUEsb0JBQUksVUFBVSxFQUFFLEtBQUssWUFBWTtBQUVqQyxvQkFBSSxHQUFHLHFCQUFxQixNQUFNO0FBQ2hDLE1BQUksYUFBYSxVQUFVO0FBQ3pCLHdCQUFJLEtBQUs7QUFBQSxFQUNYO0FBQ0YsQ0FBQztBQUVELG9CQUFJLEdBQUcsWUFBWSxNQUFNO0FBRXZCLE1BQUksZUFBZSxNQUFNO0FBQ3ZCLGlCQUFhO0FBQUEsRUFDZjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbIm1vZHVsZSIsICJtb2R1bGUiLCAicGF0aCIsICJhcGkiLCAib3MiLCAicGF0aCJdCn0K
