import React from "react";
import Dropzone from "react-dropzone";
import csv from "csv";

export default function DropzoneComponent(props) {
  const handleFileUpload = files => {
    const file = files[0];
    let rideList = [];

    const reader = new FileReader();
    reader.onload = () => {
      csv.parse(reader.result, (err, data) => {
        const headers = data.shift();
        // console.log(data);
        // console.log(headers);
        rideList = data.map(item => {
          const rideObject = {};
          item.forEach((rideInfo, i) => {
            rideObject[headers[i]] = rideInfo === "NULL" ? null : rideInfo;
          });
          return rideObject;
        });
        /*
        let totalLat = "0";
        let totalLong = "0";
        let totalCount = 0;
        console.log(Number(rideList[0].from_lat));
        rideList.forEach(item => {
          if (item.from_lat) {
            let bigLat = new BigNumber(item.from_lat);
            let bigLong = new BigNumber(item.from_long);
            totalLat = bigLat
              .plus(totalLat)
              .decimalPlaces(5)
              .toString();
            totalLong = bigLong
              .plus(totalLong)
              .decimalPlaces(5)
              .toString();
            console.log(totalLat);
            totalCount++;
          }
          if (item.to_lat) {
            let bigLat = new BigNumber(item.to_lat);
            let bigLong = new BigNumber(item.to_long);
            totalLat = bigLat
              .plus(totalLat)
              .decimalPlaces(5)
              .toString();
            totalLong = bigLong
              .plus(totalLong)
              .decimalPlaces(5)
              .toString();
            console.log(totalLat);
            totalCount++;
          }
        });
        // console.log(totalLat);
        const bigTotalLat = new BigNumber(totalLat);
        const bigTotalLong = new BigNumber(totalLong);
        const viewportLat = bigTotalLat
          .dividedBy(totalCount)
          .decimalPlaces(5)
          .toNumber();
        const viewportLong = bigTotalLong
          .dividedBy(totalCount)
          .decimalPlaces(5)
          .toNumber();
        console.log(viewportLat, viewportLong);
        // 13.00198 77.63817
        */
        // this._onViewportChange({ latitude: 13.00198, longitude: 77.63817 });
        props.handleDrop(rideList);
      });
    };
    reader.readAsBinaryString(file);
  };

  return (
    <Dropzone
      accept=".csv"
      onDrop={acceptedFiles => handleFileUpload(acceptedFiles)}
    >
      {({ getRootProps, getInputProps }) => (
        <section className="dropzone">
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here, or click to select files</p>
          </div>
        </section>
      )}
    </Dropzone>
  );
}
