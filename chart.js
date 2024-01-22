/**
 * Returns the title configuration for the chart.
 *
 * The title text, position, alignment and styling can be customized.
 */
const getTitle = () => {
  return {
    text: "International wealth index (IWI)", // Title text
    left: "50%", // Adjust the left position as needed
    top: "-1%", // Adjust the top position as needed
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
    // data: data.map((item) => item.village),
    orient: "horizontal",
    bottom: 0,
    type: "scroll",
    itemHeight: 15,
    itemWidth: 15,
    textStyle: {
      fontSize: 15,
    },
  };
};

/**
 * Configures the x-axis for the chart.
 *
 * Sets the axis type to numeric value.
 * Customizes the axis name, position, and styling.
 * Sets the axis range from 0 to 60.
 * Sets the axis tick configuration.
 * Configures formatting for the axis labels.
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
    min: 0,
    max: data[0]?.data?.length * 10,
    interval: 10,
    splitLine: {
      show: false,
    },
    axisTick: {
      interval: 0, // Set the interval to control tick spacing
      show: true,
      alignWithLabel: true,
    },
    axisLabel: {
      color: "#A9A9A9",
      fontSize: 18,
      formatter: function (value) {
        return value; // Display the x-axis value without modification
      },
    },
    splitNumber: null,
  };
};

/**
 * Configures the y-axis for the chart.
 *
 * Sets the axis type to numeric value.
 * Configures styling and labels for the axis.
 * Sets the axis tick and split configurations.
 */
const getYAxis = () => {
  return {
    type: "value",
    // min: 0,
    // max: 100,
    interval: 25,
    axisLabel: {
      formatter: "{value}%",
      hideOverlap: true,
      showMaxLabel: true,
      showMinLabel: true,
      color: "#A9A9A9",
      fontSize: 18,
    },
    splitNumber: "",
    axisLine: {
      lineStyle: {
        color: "black",
      },
    },
    nameTextStyle: {
      fontSize: 12,
      fontWeight: "bolder",
    },
  };
};

/**
 * Configures the series data for the chart.
 *
 * Maps over the village data array to generate a series object for each village.
 * Sets the interval between x-axis values to 10.
 * Configures the bar width, gap, and category gap.
 * Stacks the series into groups by village index.
 * Sets the bar color based on village index.
 * Enables emphasis on hover to highlight bars.
 */
const getSeries = () => {
  return data.map((village, index) => {
    var interval = 10; // Set the interval to 10
    return {
      name: village.village,
      type: "bar",
      data: village.data.map((value, i) => [i * interval, value]),
      markArea: {},
      // label: { show: true, position: "top" }, // Show labels on the bars
      showSymbol: false,
      smooth: false,
      barWidth: 15, // Adjust the bar width as needed
      barMaxWidth: 15,
      barGap: "30%", // Adjust the barGap as needed
      barCategoryGap: "20%", // Adjust the barCategoryGap as needed
      stack: "Village " + (index + 1),
      itemStyle: {
        color: getColor(index),
      },
      emphasis: {
        focus: "series",
      },
      // Uncomment this code to show the percentage on top of the bars
      // label: {
      //   show: true,
      //   position: "top",
      //   formatter: "{c}%", // Display data on top of the bars
      // },
    };
  });
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
    containLabel: true,
    left: "2%",
    right: "20%",
    // bottom: 50, // Adjust the bottom to accommodate x-axis labels
  };
};

/**
 * Calculates the average of the data arrays for each village.
 * Mutates the villageData array to add an "average" property for each village.
 */
const addAverage = () => {
  return data?.map((item) => {
    const { data } = item;
    const sum = data.reduce((acc, currentValue) => acc + currentValue, 0);
    item.average = (sum / data.length).toFixed(2);
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
    show: true,
    textStyle: {
      fontSize: 12,
    },
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
