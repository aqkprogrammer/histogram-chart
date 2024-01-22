/**
 * Returns the title configuration for the chart.
 *
 * The title text, position, alignment and styling can be customized.
 */
const getTitle = () => {
  return {
    text: "International wealth index (IWI)", // Title text
    left: "50%", // Adjust the left position as needed
    top: "1%", // Adjust the top position as needed
    textAlign: "center", // Title text alignment
    textStyle: {
      color: "#000", // Title text color
      fontSize: 40, // Title font size
    },
  };
};

/**
 * Configures the legend for the chart.
 *
 * Sets the legend data to the list of village names.
 * Orients the legend horizontally at the bottom.
 */
const getLegends = () => {
  return {
    data: villageData.map((item) => item.village),
    orient: "horizontal",
    bottom: 0,
  };
};

/**
 * Configures the x-axis for the chart.
 *
 * Sets the axis type to numeric value.
 * Configures the axis name, location, text style and gap.
 * Disables split lines on the axis.
 */
const getXAxis = () => {
  return {
    type: "value",
    name: "IWI Score (0-100)",
    nameLocation: "end",
    nameTextStyle: {
      align: "right",
      verticalAlign: "top",
      fontWeight: "bold",
      padding: [40, 0, 0, 0],
    },
    nameGap: -380,
    // min: 0,
    // max: 60,
    interval: 10,
    splitLine: {
      show: false,
    },
  };
};

/**
 * Configures the y-axis for the chart.
 *
 * Sets the axis type to numeric value.
 * Sets the axis interval to 25.
 * Configures the axis label formatter to display percentages.
 */
const getYAxis = () => {
  return {
    type: "value",
    // min: 0,
    // max: 100,
    interval: 25,
    axisLabel: {
      formatter: "{value}%",
    },
  };
};

/**
 * Maps the village data array to a series array for the chart.
 *
 * For each village data object, it creates a series with the village name,
 * bar chart type, smoothed bars with no gap, emphasis on the series when hovered,
 * the village data mapped to the series data, 100% bar width,
 * and labels displayed on top of the bars showing the percentage value.
 *
 * Returns the array of series objects.
 */
const getSeries = () => {
  return villageData.map((item, index) => ({
    name: item.village,
    type: "bar",
    smooth: true,
    barGap: 0,
    emphasis: {
      focus: "series",
    },
    data: item.data,
    barWidth: "100%",
    itemStyle: {
      color: getColor(index),
    },
    // Uncomment this code to show the percentage on top of the bars
    // label: {
    //   show: true,
    //   position: "top",
    //   formatter: "{c}%", // Display data on top of the bars
    // },
  }));
};

/**
 * Configures the toolbox for the chart.
 *
 * Enables the "Save as Image" feature with increased pixel ratio for higher
 * resolution images.
 */
const getToolBox = () => {
  return {
    feature: {
      saveAsImage: {
        pixelRatio: 2,
      },
    },
  };
};

/**
 * Configures the grid for the chart.
 *
 * Sets the left margin to 10% and the right margin to 20% to leave space
 * for displaying the village average data. Enables containment of axis labels.
 */
const getGrid = () => {
  return {
    left: "10%",
    right: "20%", // Adjust the right margin to leave space for the average display
    containLabel: true,
  };
};

/**
 * Calculates the average of the data arrays for each village.
 * Mutates the villageData array to add an "average" property for each village.
 */
const addAverage = () => {
  return villageData?.map((item) => {
    const { data } = item;
    const arr = data.reduce((acc1, currentArray) => acc1.map((value, index) => value + currentArray[index]), [0, 0]);
    item.average = ((arr[0] + arr[1]) / data.length).toFixed(2);
    return item;
  });
};

/**
 * Configures and returns the data to display the village averages.
 *
 * Calls addAverage() to calculate averages, then maps over villageData
 * to return text elements displaying the village name and average value.
 * Adjusts positioning and styling of the text elements.
 */
const getAverageData = () => {
  return {
    type: "group",
    elements: addAverage()?.map((v, i) => ({
      type: "text",
      right: 40,
      top: 250 + i * 20,
      style: {
        text: `${v.village} Avg. unit: ${v.average}`,
        font: "20px Arial",
        fill: getColor(i) ?? "#000",
      },
    })),
  };
};

/**
 * Configures and returns tooltip options for the chart.
 *
 * Sets trigger to 'axis' for tooltips to be shown when hovering over
 * axes. Configures axisPointer to show crosshair style tooltips.
 */
const getToolTip = () => {
  return {
    trigger: "axis",
    axisPointer: {
      type: "cross",
      //   type: "shadow",
      //   type: "line",
    },
  };
};

/**
 * Returns ARIA accessibility options.
 *
 * Enables ARIA and shows decals for accessibility.
 */
const getAria = () => {
  return {
    enabled: true,
    decal: {
      show: true,
    },
  };
};
/**
 * Returns a color from the colorList array for the given index.
 *
 * @param {number} i - The index of the color to retrieve.
 * @returns {string} The color for the given index.
 */
const colorList = ["#6F9CA3", "#FEC876", "#89B99B", "#7B72FF", "#4A7A81"];
const getColor = (i) => {
  return colorList[i];
};