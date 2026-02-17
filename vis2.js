// Load data from datasets/videogames_wide.csv using d3.csv and then make visualizations
async function fetchData() {
  const data = await d3.csv("./assets/datasets/videogames_wide.csv");
  return data;
}

fetchData().then((videoGamesData) => {
  // VISUALIZATION 1
  // Q1
  const simulationGames = videoGamesData.filter(
    (d) => typeof d.Genre === "string" && d.Genre.includes("Simulation")
  );
  const spec = vl
    .markBar()
    .data(simulationGames)
    .transform(vl.filter("datum.Global_Sales > 0.45"))
    .encode(
      vl.x().fieldQ("Global_Sales").aggregate("sum").title("Total Sales"),
      vl.y().fieldN("Platform").sort("-x"),
      vl.color().fieldN("Platform").legend(false),
      vl.tooltip([
        vl.tooltip().fieldN("Platform").title("Platform"),
        vl.tooltip().fieldQ("Global_Sales").aggregate("sum").title("Sales"),
      ])
    )
    .width("container")
    .height(400)
    .toSpec();

  render("#view", spec);
  // Q2
  const spec2 = vl
  .markRect()
  .data(videoGamesData)
  .transform(
    vl.filter("datum.Global_Sales > 0"))
  .encode(
    vl.x().fieldN("Platform").title("Platform"),
    vl.y().fieldN("Genre").title("Genre"),
    vl.color().fieldQ("Global_Sales").aggregate("sum").title("Total Sales"),
    vl.tooltip([
      vl.tooltip().fieldN("Platform").title("Platform"),
      vl.tooltip().fieldN("Genre").title("Genre"),
      vl.tooltip().fieldQ("Global_Sales").aggregate("sum").title("Genre")
    ])
  )
  .width("container")
  .height(400)
  .toSpec();
  render("#view2",spec2);
  // VISUALIZATION 2
  // Q1
  const actionSportsSimulationGames = videoGamesData.filter((d) => {
    return typeof(d.Genre)==="string" && d.Genre.includes("Action") || d.Genre.includes("Sports") || d.Genre.includes("Simulation")
  })
  const spec3 = vl
  .markLine()
  .data(actionSportsSimulationGames)
  .transform(
    vl.filter("datum.Global_Sales > 0"),
    vl.filter("datum.Year != 'N/A' && datum.Year != null")
  )
  .encode(
    vl.x()
      .fieldO("Year")
      .title("Year"),
    vl.y()
      .fieldQ("Global_Sales")
      .aggregate("sum")
      .title("Total Sales"),
    vl.color()
      .fieldN("Genre")
      .title("Genre"),
    vl.tooltip([
      vl.tooltip().fieldO("Year").title("Year"),
      vl.tooltip().fieldN("Genre").title("Genre"),
      vl.tooltip().fieldQ("Global_Sales").aggregate("sum").title("Total Sales"),
    ])
  )
  .width("container")
  .height(400)
  .toSpec();
  render("#view3",spec3);
  // Q2
  const spec4 = vl
  .markLine()
  .data(videoGamesData)
  .transform(
    vl.filter("datum.Global_Sales > 0"),
    vl.filter("datum.Year != 'N/A' && datum.Year != null"),
    vl.filter("datum.Platform == 'PS2' || datum.Platform == 'X360'"),
    vl.filter("datum.Genre == 'Action'")
  )
  .encode(
    vl.x()
      .fieldO("Year")
      .title("Year"),
    vl.y()
      .fieldQ("Global_Sales")
      .aggregate("sum")
      .title("Total Sales"),
    vl.color()
      .fieldN("Platform")
      .title("Platform"),
    vl.tooltip([
      vl.tooltip().fieldO("Year").title("Year"),
      vl.tooltip().fieldN("Platform").title("Platform"),
      vl.tooltip().fieldQ("Global_Sales").aggregate("sum").title("Total Sales"),
    ])
  )
  .width("container")
  .height(400)
  .toSpec();
  render("#view4",spec4);
  // VISUALIZATION 3
  // Q1
  const regionalSales = videoGamesData.flatMap(d => [
  { Year: d.Year, Publisher: d.Publisher, Genre: d.Genre, Platform: d.Platform, Region: "North America", Sales: d.NA_Sales },
  { Year: d.Year, Publisher: d.Publisher, Genre: d.Genre, Platform: d.Platform, Region: "Europe", Sales: d.EU_Sales },
  { Year: d.Year, Publisher: d.Publisher, Genre: d.Genre, Platform: d.Platform, Region: "Japan", Sales: d.JP_Sales },
  { Year: d.Year, Publisher: d.Publisher, Genre: d.Genre, Platform: d.Platform, Region: "Others", Sales: d.Other_Sales }
]).filter(d =>
  d.Platform != null &&
  d.Sales != null &&
  d.Genre != null &&
  d.Year != null &&
  d.Publisher != null &&
  d.Sales > 0
); 
const spec5 = vl
  .markCircle()
  .data(regionalSales)
  .encode(
    vl.x().fieldN("Region").title("Region"),
    vl.y().fieldN("Platform").title("Platform"),
    vl.size().fieldQ("Sales").aggregate("sum").title("Total Sales"),
    vl.color().fieldQ("Sales").aggregate("sum").title("Total Sales"),
    vl.tooltip([
      vl.tooltip().fieldN("Region").title("Region"),
      vl.tooltip().fieldN("Platform").title("Platform"),
      vl.tooltip().fieldQ("Sales").aggregate("sum").title("Total Sales")
    ])
  )
  .width("container")
  .height(600)
  .toSpec();
  render("#view5",spec5);
  // Q2
  const spec6 = vl
  .markBar()
  .data(regionalSales)
  .transform(
    vl.filter('datum.Region == "North America" || datum.Region == "Japan"'),
    vl.filter('datum.Sales > 2')

  )
  .encode(
    vl.y().fieldN("Platform").title("Platform"),
    vl.x().fieldQ("Sales").aggregate("sum").title("Total Sales"),
    vl.color().fieldN("Region").title("Region"),
    vl.tooltip([
      vl.tooltip().fieldN("Platform"),
      vl.tooltip().fieldN("Region"),
      vl.tooltip().fieldQ("Sales").aggregate("sum").title("Total Sales")
    ])
  )
  .width("container")
  .height(400)
  .toSpec();
  render("#view6",spec6);
  // VISUALIZATION 4
  // Q1
  const spec7 = vl
  .markBar()
  .data(regionalSales)
  .transform(
    vl.filter(
      "datum.Genre == 'Simulation' || datum.Genre == 'Role-Playing' || datum.Genre == 'Sports'"
    )
  )
  .encode(
    vl.x().fieldN("Region").title("Region"),
    vl.y().fieldQ("Sales").aggregate("sum").title("Total Sales"),
    vl.color().fieldN("Genre").title("Genre"),
    vl.xOffset().fieldN("Genre"),
    vl.tooltip([
      vl.tooltip().fieldN("Region"),
      vl.tooltip().fieldN("Genre"),
      vl.tooltip().fieldQ("Sales").aggregate("sum").title("Total Sales")
    ])
  )
  .width("container")
  .height(400)
  .toSpec();
  render("#view7",spec7);
  // Q2
  const spec8 = vl
  .markLine()
  .data(regionalSales)
  .transform(
    vl.filter("datum.Publisher == 'Nintendo' || datum.Publisher == 'Ubisoft' || datum.Publisher == 'Electronic Arts'"),
    vl.filter("datum.Region == 'Japan' || datum.Region == 'North America'"),
    vl.filter("datum.Year >= 2000 && datum.Year <= 2010")
  )
  .encode(
    vl.row().fieldN("Region"),
    vl.x().fieldO("Year").title("Year"),
    vl.y()
      .fieldQ("Sales")
      .aggregate("sum")
      .title("Total Sales"),
    vl.color()
      .fieldN("Publisher")
      .title("Publisher"),
    vl.tooltip([
      vl.tooltip().fieldO("Year"),
      vl.tooltip().fieldN("Publisher"),
      vl.tooltip().fieldQ("Sales").aggregate("sum").title("Total Sales")
    ])
  )
  .width(550)
  .height(400)
  .toSpec({
  autosize: { type: "fit-x", contains: "padding" }
});
  render("#view8",spec8);
});


async function render(viewID, spec) {
  const result = await vegaEmbed(viewID, spec);
  result.view.run();
}