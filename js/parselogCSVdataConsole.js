async function getData() {
  const response = await fetch("Dallas_County _Coronavirus.csv");
  const data = await response.text();

  // split row
  const rows = data.split("\n");
  //split colums
  const columns = rows.forEach((row) => {
    const rows = row.split(",");
    console.log(rows);
  });
}
getData();
