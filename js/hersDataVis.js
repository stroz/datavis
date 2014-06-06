$(document).ready(function () {
    var millionFormatter = function (format, value) {
        // Divide by 1000000 and round to 1 decimal place
	var returnValue = value / 1000000;
	if (returnValue >= 1000) {
	    returnValue = returnValue / 1000;
	    return '$' + Math.round(returnValue * 10) / 10 + 'B';
	} else {
            return '$' + Math.round(returnValue * 10) / 10 + 'M';
	}
    };

    var thousandFormatter = function (format, value) {
        // Divide by 1000 and round to 1 decimal place
        return Math.round((value / 1000) * 10) / 10 + "K";
    };

    // Membership Bar Chart Data
    var s1 = [
        [2002, 96373],
        [2003, 97831],
        [2004, 99371],
        [2005, 101312],
        [2006, 103537],
        [2007, 106129],
        [2008, 108696],
        [2009, 110927],
        [2010, 111226],
        [2011, 111648],
        [2012, 113252],
        [2013, 115350]
    ];

    // Total Contributions Data
    var s2 = [
        [2002, 222910116, 222910116],
        [2003, 247800797, null],
        [2004, 290802248, null],
        [2005, 385771339, null],
        [2006, 479703550, null],
        [2007, 599152471, null],
        [2008, 652145667, null],
        [2009, 756453668, null],
        [2010, 907716743, null],
        [2011, 771572912, null],
        [2012, 727118282, null],
        [2013, 767284398, 767284398]
    ];

    // Benefits Payments Data
    var s3 = [
        [2002, 530381277, 530381277],
        [2003, 569235512, null],
        [2004, 636214617, null],
        [2005, 676316347, null],
        [2006, 750542990, null],
        [2007, 761004748, null],
        [2008, 792312830, null],
        [2009, 833691245, null],
        [2010, 905315348, null],
        [2011, 960219432, null],
        [2012, 1015447668, null],
        [2013, 1060561148, 1060561148]
    ];

    var options = {
        title: "HERS Membership",

        seriesColors: ["rgba(0,0,0,0.12)", "#67b246", "#5999ca"],

        grid: {
            background: '#ffffff',
            shadow: false
        },

        legend: {
            show: true
        },

        // Turns on animation for all series in this plot.
        animate: true,
        // Will animate plot on calls to plot1.replot({resetAxes:true})
        animateReplot: true,
        series: [{
            showLabel: false,
            shadow: false,
            pointLabels: {
                show: true
            },
            renderer: $.jqplot.BarRenderer,
            showHighlight: false,
            yaxis: 'y2axis',
            rendererOptions: {
                // Speed up the animation a little bit.
                // This is a number of milliseconds.  
                // Default for bar series is 3000.  
                animation: {
                    speed: 4000
                },
                barWidth: 20,
                barPadding: -20,
                barMargin: 0,
                highlightMouseOver: false,
                shadowOffset: 0
            }
        }, {
            label: 'Total Contributions',
            showLabel: true,
            showMarker: false,
            lineWidth: 7,
            //shadow: false,
            pointLabels: {
                show: true
            },
            rendererOptions: {
                // speed up the animation a little bit.
                // This is a number of milliseconds.
                // Default for a line series is 2500.
                animation: {
                    speed: 3000
                },
            }
        }, {
            label: 'Benefits Payments',
            showLabel: true,
            showMarker: false,
            lineWidth: 7,
            //shadow: false,
            pointLabels: {
                show: true
            },
            rendererOptions: {
                // speed up the animation a little bit.
                // This is a number of milliseconds.
                // Default for a line series is 2500.
                animation: {
                    speed: 3000
                },
                size: 0,
            }
        }],
        axesDefaults: {
            pad: 0
        },
        axes: {
            // These options will set up the x axis like a category axis.
            xaxis: {
                min: 2002,
                max: 2013,
                numberTicks: 12,
                tickInterval: 1,
                drawMajorGridlines: false,
                drawMinorGridlines: false,
                drawMajorTickMarks: false,
                rendererOptions: {
                    tickInset: 0.5
                }
            },
            yaxis: {
                min: 0,
                max: 1300000000,
                numberTicks: 14,
                tickOptions: {
                    formatter: millionFormatter,
                    showMark: false
                },
                rendererOptions: {
                    forceTickAt0: true
                }
            },
            y2axis: {
                tickOptions: {
                    show: false,
                    formatter: thousandFormatter
                },
                rendererOptions: {
                    // align the ticks on the y2 axis with the y axis.
                    alignTicks: true,
                    forceTickAt0: true
                }
            }
        }
    };

    //Replot on window resize if the chart has been initialized
    var timeout;
    $(window).resize(function(){
	if(plot1) {
	    clearTimeout(timeout);
	    timeout = setTimeout(function(){
		plot1.replot("chart1", [s1, s2, s3], options);
	    }, 500);
	}
    });

    //Call renderChart() to initialize and animate the chart
    function renderChart() {
	plot1 = $.jqplot("chart1", [s1, s2, s3], options);
    };

    //Kick things off!
    renderChart();

});