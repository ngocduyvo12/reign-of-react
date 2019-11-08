import React, { Component } from "react";
import "../styles/map.css";


function hellerbenia() {
    alert(`Clicked on hellerbenia`)
}

function Map() {
    return (
        //left half of the map
        <map name="game-map">
            <area shape="poly" coords="277,395,237,434,211,559,278,624,315,556,444,480, 413, 405" onClick={hellerbenia} />



            //right half of the map
            <area target="" alt="ixasia" title="ixasia" href="" coords="1100,121,1157,168,1124,199,1038,145,1012,94,1067,93" shape="poly" />
            <area target="" alt="vimia" title="vimia" href="" coords="1122,137,1194,189,1240,130,1179,68" shape="poly" />
            <area target="" alt="tetrodia" title="tetrodia" href="" coords="1192,195,1246,130,1282,137,1279,228,1256,278" shape="poly" />
            <area target="" alt="vinhoesia" title="vinhoesia" href="" coords="1289,160,1323,189,1326,246,1297,261,1280,231" shape="poly" />
            <area target="" alt="wagamaran" title="wagamaran" href="" coords="1328,189,1329,150,1407,135,1453,171,1404,287,1328,296" shape="poly" />
            <area target="" alt="tsuan" title="tsuan" href="" coords="1520,195,1658,352,1684,537,1393,515,1396,316" shape="poly" />
            <area target="" alt="obeian" title="obeian" href="" coords="1373,519,1587,536,1655,586,1635,791,1539,863,1350,787" shape="poly" />
            <area target="" alt="kagagami" title="kagagami" href="" coords="1370,510,1336,770,1126,826,1065,798,1142,673,1248,635" shape="poly" />
            <area target="" alt="zhizhaca" title="zhizhaca" href="" coords="1341,511,1243,625,1088,689,1077,627,1174,598,1254,480" shape="poly" />
            <area target="" alt="oiwaiba" title="oiwaiba" href="" coords="1337,495,1378,458,1310,371,1267,414,1290,482" shape="poly" />
            <area target="" alt="mita" title="mita" href="" coords="1385,454,1396,292,1306,305,1303,355" shape="poly" />
            <area target="" alt="niracostia" title="niracostia" href="" coords="1321,252,1298,339,1253,350,1210,316,1127,331,1114,215,1160,173,1256,278,1277,236,1298,261" shape="poly" />
            <area target="" alt="casish" title="casish" href="" coords="1271,458,1212,519,1100,482,1122,340,1210,319,1248,355,1275,350" shape="poly" />
            <area target="" alt="qol" title="qol" href="" coords="1214,523,1170,581,1109,562,1038,479,1082,446,1104,492" shape="poly" />
            <area target="" alt="nechod" title="nechod" href="" coords="1168,590,1093,616,1023,559,990,480,1034,480,1108,563" shape="poly" />
            <area target="" alt="qhesir" title="qhesir" href="" coords="1100,443,995,472,946,410,995,327,1117,342" shape="poly" />
            <area target="" alt="niria" title="niria" href="" coords="1117,327,959,319,1012,235,1007,132,1114,200" shape="poly" />
            <area target="" alt="qolzil" title="qolzil" href="" coords="1080,614,1057,673,968,695,972,645,872,585,872,549,994,534" shape="poly" />
        </map>



    )
}

export default Map;