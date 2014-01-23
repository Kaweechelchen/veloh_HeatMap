<?php

    header('content-type: application/json; charset=utf-8');
    header("Access-Control-Allow-Origin: *");

    include('apikey.php');

    $jcdecaux_stations_data = file_get_contents('https://api.jcdecaux.com/vls/v1/stations?contract=Luxembourg&apiKey=' . $apiKey);

    $stations = json_decode($jcdecaux_stations_data, true);

    foreach ($stations as $station) {

        $stationData['lat']     =   $station['position']['lat'];
        $stationData['lon']     =   $station['position']['lng'];

        $percentageAvailable    =   100 - round(
            (
                $station['available_bike_stands']
                / $station['bike_stands']
                * 100
            ));

        $stationData['value']   =   $percentageAvailable;


        $heatmapdata[] = $stationData;

    }

    echo json_encode( $heatmapdata );