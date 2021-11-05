d3.csv("./data/occupations.csv").then(function (data) {

    console.log(data);


    // DEFINE DIMENSIONS AND GENERATE SVG


    var width = document.querySelector("#chart").clientWidth;
    var height = document.querySelector("#chart").clientHeight;
    var margin = {
        top: 50,
        left: 150,
        right: 50,
        bottom: 150
    };

    var svg = d3.select("#chart")
        .append("svg")
        .attr("width", width)
        .attr("height", height);



    var filtered_data_mgt = data.filter(function (d) {
        return d.occupations === "Management, business, science, and arts";
    });

    var filtered_data_sales = data.filter(function (d) {
        return d.occupations === "Sales and office occupations";
    });

    var filtered_data_serv = data.filter(function (d) {
        return d.occupations === "Service occupations";
    });

    var filtered_data_prod = data.filter(function (d) {
        return d.occupations === "Production, transportation, and material moving occupations";
    });

    var filtered_data_nat = data.filter(function (d) {
        return d.occupations === "Natural resources, construction, and maintenance occupations";
    });


    // CALCULATE MINIMUM AND MAXIMUM VALUES


    var income_f = {
        min_mgt: d3.min(filtered_data_mgt, function (d) {
            return +d.incomeFemale;
        }),
        max_mgt: d3.max(filtered_data_mgt, function (d) {
            return +d.incomeFemale;
        })
    };

    console.log(income_f);

    var income_m = {
        min_mgt: d3.min(filtered_data_mgt, function (d) {
            return +d.incomeMale;
        }),
        max_mgt: d3.max(filtered_data_mgt, function (d) {
            return +d.incomeMale;
        })
    };

    console.log(income_m);




    //DEFINE SCALES

    var xScale = d3.scaleLinear()
        .domain([0, 90])
        .range([margin.left, width - margin.right]);

    var yScale = d3.scaleLinear()
        .domain([0, 90])
        .range([height - margin.bottom, margin.top]);



    var colorScale = d3.scaleOrdinal(d3.schemeCategory10);


    //DRAW AXES

    var xAxis = svg.append("g")
        .attr("class", "axis")
        .attr("transform", `translate(0,${height-margin.bottom})`)
        .call(d3.axisBottom().scale(xScale));

    var yAxis = svg.append("g")
        .attr("class", "axis")
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft().scale(yScale));


    //DRAW POINTS FOR SCATTER PLOT


    var dots = svg.selectAll("circle")
        .data(filtered_data_mgt, function (d) {
            return d.state;
        })
        .enter()
        .append("circle")
        .attr("cx", function (d) {
            return xScale(0);
        })
        .attr("cy", function (d) {
            return yScale(0);
        })
        .attr("r", 5)
        .attr("fill", function (d) {
            return colorScale(d.subRegion);
        })
        .attr("opacity", 0.7)
        .attr("stroke", "white")
        .attr("stroke-width", 1);



    //DRAW AXIS LABELS

    var xAxisLabel = svg.append("text")
        .attr("class", "axisLabel")
        .attr("x", width / 2 - margin.right)
        .attr("y", height - margin.bottom / 2)
        .text("Female Income (Thousand $)");

    var yAxisLabel = svg.append("text")
        .attr("class", "axisLabel")
        .attr("transform", "rotate(-90)")
        .attr("x", -height / 2 - margin.right)
        .attr("y", margin.left / 2)
        .text("Male Income (Thousand $)");



    //BOTTON



    // Management, business, science, and arts

    d3.select("#mgt").on("click", function () {


        var enterDots = svg.selectAll("circle")
            .data(filtered_data_mgt, function (d) {
                return d.state;
            })

        enterDots.enter().append("circle")
            .attr("cx", function (d) {
                return xScale(0);
            })
            .attr("cy", function (d) {
                return yScale(0);
            })
            .attr("r", 5)
            .attr("fill", function (d) {
                return colorScale(d.subRegion);
            })
            .attr("opacity", 0.7)
            .attr("stroke", "white")
            .attr("stroke-width", 1)
            .merge(enterDots)
            .transition()
            .duration(2000)
            .delay(200)
            .attr("cx", function (d) {
                return xScale(d.incomeFemale / 1000);
            })
            .attr("cy", function (d) {
                return yScale(d.incomeMale / 1000);
            })
            .attr("r", 5)
            .attr("fill", function (d) {
                return colorScale(d.subRegion);
            })
            .attr("opacity", 0.7)
            .attr("stroke", "white")
            .attr("stroke-width", 1);

        enterDots.exit()
            .transition()
            .duration(2000)
            .delay(200)
            .attr("opacity", 0);


    });

    states = [];
    var states = filtered_data_mgt.map(function (d) {
        return d.state;
    });

    console.log(states);

    d3.select("#selectButton")
        .selectAll('myOptions')
        .data(states)
        .enter()
        .append('option')
        .text(function (d) {
            return d;
        }) // text showed in the menu
        .attr("value", function (d) {
            return d;
        })

    function update(states) {

        var dataFilter = filtered_data_mgt.map(function(d){
            return d.state;
            });

        enterDots.enter().append("circle")
            .data(dataFilter)
            .transition()
            .duration(1000)
            .attr("cx", function (d) {
                return xScale(d.incomeFemale / 1000);
            })
            .attr("cy", function (d) {
                return yScale(d.incomeMale / 1000);
            })
            .attr("r", 5)
            .attr("fill", function (d) {
                return colorScale(d.subRegion);
            })
            .attr("opacity", 0.7)
            .attr("stroke", "white")
            .attr("stroke-width", 1)
    }

    d3.select("#selectButton").on("change", function (d) {

        var filter_maine = filtered_data_mgt.filter(function(d){
            return d.state === "Maine";
        })
        
        var enterDots = svg.selectAll("circle")
        .data(filter_maine)

        enterDots.enter().append("circle")
            .attr("cx", function (d) {
                return xScale(0);
            })
            .attr("cy", function (d) {
                return yScale(0);
            })
            .attr("r", 5)
            .attr("fill", function (d) {
                return colorScale(d.subRegion);
            })
            .attr("opacity", 0.7)
            .attr("stroke", "white")
            .attr("stroke-width", 1)
            .merge(enterDots)
            .transition()
            .duration(2000)
            .delay(200)
            .attr("cx", function (d) {
                return xScale(d.incomeFemale / 1000);
            })
            .attr("cy", function (d) {
                return yScale(d.incomeMale / 1000);
            })
            .attr("r", 5)
            .attr("fill", function (d) {
                return colorScale(d.subRegion);
            })
            .attr("opacity", 0.7)
            .attr("stroke", "white")
            .attr("stroke-width", 1);

        enterDots.exit()
            .transition()
            .duration(2000)
            .delay(200)
            .attr("opacity", 0);
    })

    // Production, transportation, and material moving occupations

    d3.select("#prod").on("click", function () {
        var enterDots = svg.selectAll("circle")
            .data(filtered_data_prod, function (d) {
                return d.state;
            });
            

        enterDots.enter().append("circle")
            .attr("cx", function (d) {
                return xScale(0);
            })
            .attr("cy", function (d) {
                return yScale(0);
            })
            .attr("r", 5)
            .attr("fill", function (d) {
                return colorScale(d.subRegion);
            })
            .attr("opacity", 0.7)
            .attr("stroke", "white")
            .attr("stroke-width", 1)
            .merge(enterDots)
            .transition()
            .duration(2000) //speed
            .delay(200)
            .attr("cx", function (d) {
                return xScale(d.incomeFemale / 1000);
            })
            .attr("cy", function (d) {
                return yScale(d.incomeMale / 1000);
            })
            .attr("r", 5)
            .attr("fill", function (d) {
                return colorScale(d.subRegion);
            })
            .attr("opacity", 0.7)
            .attr("stroke", "white")
            .attr("stroke-width", 1);

        enterDots.exit()
            .transition()
            .duration(2000)
            .delay(200)
            .attr("opacity", 0);

    });

    d3.select("#sales").on("click", function () {



        var enterDots = svg.selectAll("circle")
            .data(filtered_data_sales, function (d) {
                return d.state;
            });

        enterDots.enter().append("circle")
            .attr("cx", function (d) {
                return xScale(0);
            })
            .attr("cy", function (d) {
                return yScale(0);
            })
            .attr("r", 5)
            .attr("fill", function (d) {
                return colorScale(d.subRegion);
            })
            .attr("opacity", 0.7)
            .attr("stroke", "white")
            .attr("stroke-width", 1)
            .merge(enterDots)
            .transition()
            .duration(2000) //speed
            .delay(200)
            .attr("cx", function (d) {
                return xScale(d.incomeFemale / 1000);
            })
            .attr("cy", function (d) {
                return yScale(d.incomeMale / 1000);
            })
            .attr("r", 5)
            .attr("fill", function (d) {
                return colorScale(d.subRegion);
            })
            .attr("opacity", 0.7)
            .attr("stroke", "white")
            .attr("stroke-width", 1);


        enterDots.exit()
            .transition()
            .duration(2000)
            .delay(200)
            .attr("opacity", 0);


    });

    d3.select("#serv").on("click", function () {



        var enterDots = svg.selectAll("circle")
            .data(filtered_data_serv, function (d) {
                return d.state;
            });


        enterDots.enter().append("circle")
            .attr("cx", function (d) {
                return xScale(0);
            })
            .attr("cy", function (d) {
                return yScale(0);
            })
            .attr("r", 5)
            .attr("fill", function (d) {
                return colorScale(d.subRegion);
            })
            .attr("opacity", 0.7)
            .attr("stroke", "white")
            .attr("stroke-width", 1)
            .merge(enterDots)
            .transition()
            .duration(2000) //speed
            .delay(200)
            .attr("cx", function (d) {
                return xScale(d.incomeFemale / 1000);
            })
            .attr("cy", function (d) {
                return yScale(d.incomeMale / 1000);
            })
            .attr("r", 5)
            .attr("fill", function (d) {
                return colorScale(d.subRegion);
            })
            .attr("opacity", 0.7)
            .attr("stroke", "white")
            .attr("stroke-width", 1);


        enterDots.exit()
            .transition()
            .duration(2000)
            .delay(200)
            .attr("opacity", 0);



    });

    d3.select("#nat").on("click", function () {
        var enterDots = svg.selectAll("circle")
            .data(filtered_data_nat, function (d) {
                return d.state;
            });

        enterDots.enter().append("circle")
            .attr("cx", function (d) {
                return xScale(0);
            })
            .attr("cy", function (d) {
                return yScale(0);
            })
            .attr("r", 5)
            .attr("fill", function (d) {
                return colorScale(d.subRegion);
            })
            .attr("opacity", 0.7)
            .attr("stroke", "white")
            .attr("stroke-width", 1)
            .merge(enterDots)
            .transition()
            .duration(2000) //speed
            .delay(200)
            .attr("cx", function (d) {
                return xScale(d.incomeFemale / 1000);
            })
            .attr("cy", function (d) {
                return yScale(d.incomeMale / 1000);
            })
            .attr("r", 5)
            .attr("fill", function (d) {
                return colorScale(d.subRegion);
            })
            .attr("opacity", 0.7)
            .attr("stroke", "white")
            .attr("stroke-width", 1);

        enterDots.exit()
            .transition()
            .duration(2000)
            .delay(200)
            .attr("opacity", 0);


    });


    //NEW ENGLAND

    d3.select("#ne1").on("click", function () {

        var filter_new = filtered_data_mgt.filter(function (d) {
            return d.subRegion === "New England";
        });
        var enterDots = svg.selectAll("circle")
            .data(filter_new, function (d) {
                return d.state;
            });

        enterDots.enter().append("circle")
            .attr("cx", function (d) {
                return xScale(d.incomeFemale / 1000);
            })
            .attr("cy", function (d) {
                return yScale(d.incomeMale / 1000);
            })
            .attr("r", 5)
            .attr("fill", function (d) {
                return colorScale(d.subRegion);
            })
            .attr("opacity", 0.7)
            .attr("stroke", "white")
            .attr("stroke-width", 1)
            .merge(enterDots)
            .transition()
            .duration(2000) //speed
            .delay(200)
            .attr("cx", function (d) {
                return xScale(d.incomeFemale / 1000);
            })
            .attr("cy", function (d) {
                return yScale(d.incomeMale / 1000);
            })
            .attr("r", 5)
            .attr("fill", function (d) {
                return colorScale(d.subRegion);
            })
            .attr("opacity", 0.7)
            .attr("stroke", "white")
            .attr("stroke-width", 1);

        enterDots.exit()
            .transition()
            .duration(2000)
            .delay(200)
            .attr("opacity", 0);
        //           .remove(); (to keep the tooltips still available)



    });


    d3.select("#ne2").on("click", function () {

        var filter_new = filtered_data_serv.filter(function (d) {
            return d.subRegion === "New England";
        });
        var enterDots = svg.selectAll("circle")
            .data(filter_new, function (d) {
                return d.state;
            });

        enterDots.enter().append("circle")
            .attr("cx", function (d) {
                return xScale(d.incomeFemale / 1000);
            })
            .attr("cy", function (d) {
                return yScale(d.incomeMale / 1000);
            })
            .attr("r", 5)
            .attr("fill", function (d) {
                return colorScale(d.subRegion);
            })
            .attr("opacity", 0.7)
            .attr("stroke", "white")
            .attr("stroke-width", 1)
            .merge(enterDots)
            .transition()
            .duration(2000) //speed
            .delay(200)
            .attr("cx", function (d) {
                return xScale(d.incomeFemale / 1000);
            })
            .attr("cy", function (d) {
                return yScale(d.incomeMale / 1000);
            })
            .attr("r", 5)
            .attr("fill", function (d) {
                return colorScale(d.subRegion);
            })
            .attr("opacity", 0.7)
            .attr("stroke", "white")
            .attr("stroke-width", 1);

        enterDots.exit()
            .transition()
            .duration(2000)
            .delay(200)
            .attr("opacity", 0);

    });

    //South Atlantic

    d3.select("#sa1").on("click", function () {

        var filter_new = filtered_data_mgt.filter(function (d) {
            return d.subRegion === "South Atlantic";
        });
        var enterDots = svg.selectAll("circle")
            .data(filter_new, function (d) {
                return d.state;
            });

        enterDots.enter().append("circle")
            .attr("cx", function (d) {
                return xScale(d.incomeFemale / 1000);
            })
            .attr("cy", function (d) {
                return yScale(d.incomeMale / 1000);
            })
            .attr("r", 5)
            .attr("fill", function (d) {
                return colorScale(d.subRegion);
            })
            .attr("opacity", 0.7)
            .attr("stroke", "white")
            .attr("stroke-width", 1)
            .merge(enterDots)
            .transition()
            .duration(2000) //speed
            .delay(200)
            .attr("cx", function (d) {
                return xScale(d.incomeFemale / 1000);
            })
            .attr("cy", function (d) {
                return yScale(d.incomeMale / 1000);
            })
            .attr("r", 5)
            .attr("fill", function (d) {
                return colorScale(d.subRegion);
            })
            .attr("opacity", 0.7)
            .attr("stroke", "white")
            .attr("stroke-width", 1);

        enterDots.exit()
            .transition()
            .duration(2000)
            .delay(200)
            .attr("opacity", 0);
        //           .remove(); (to keep the tooltips still available)



    });

    d3.select("#sa2").on("click", function () {

        var filter_new = filtered_data_serv.filter(function (d) {
            return d.subRegion === "South Atlantic";
        });
        var enterDots = svg.selectAll("circle")
            .data(filter_new, function (d) {
                return d.state;
            });

        enterDots.enter().append("circle")
            .attr("cx", function (d) {
                return xScale(d.incomeFemale / 1000);
            })
            .attr("cy", function (d) {
                return yScale(d.incomeMale / 1000);
            })
            .attr("r", 5)
            .attr("fill", function (d) {
                return colorScale(d.subRegion);
            })
            .attr("opacity", 0.7)
            .attr("stroke", "white")
            .attr("stroke-width", 1)
            .merge(enterDots)
            .transition()
            .duration(2000) //speed
            .delay(200)
            .attr("cx", function (d) {
                return xScale(d.incomeFemale / 1000);
            })
            .attr("cy", function (d) {
                return yScale(d.incomeMale / 1000);
            })
            .attr("r", 5)
            .attr("fill", function (d) {
                return colorScale(d.subRegion);
            })
            .attr("opacity", 0.7)
            .attr("stroke", "white")
            .attr("stroke-width", 1);

        enterDots.exit()
            .transition()
            .duration(2000)
            .delay(200)
            .attr("opacity", 0);

    });


    //Pacific

    d3.select("#pa1").on("click", function () {

        var filter_new = filtered_data_mgt.filter(function (d) {
            return d.subRegion === "Pacific";
        });

        var enterDots = svg.selectAll("circle")
            .data(filter_new, function (d) {
                return d.state;
            });

        enterDots.enter().append("circle")
            .attr("cx", function (d) {
                return xScale(d.incomeFemale / 1000);
            })
            .attr("cy", function (d) {
                return yScale(d.incomeMale / 1000);
            })
            .attr("r", 5)
            .attr("fill", function (d) {
                return colorScale(d.subRegion);
            })
            .attr("opacity", 0.7)
            .attr("stroke", "white")
            .attr("stroke-width", 1)
            .merge(enterDots)
            .transition()
            .duration(2000) //speed
            .delay(200)
            .attr("cx", function (d) {
                return xScale(d.incomeFemale / 1000);
            })
            .attr("cy", function (d) {
                return yScale(d.incomeMale / 1000);
            })
            .attr("r", 5)
            .attr("fill", function (d) {
                return colorScale(d.subRegion);
            })
            .attr("opacity", 0.7)
            .attr("stroke", "white")
            .attr("stroke-width", 1);

        enterDots.exit()
            .transition()
            .duration(2000)
            .delay(200)
            .attr("opacity", 0);
        //           .remove(); (to keep the tooltips still available)



    });

    d3.select("#pa2").on("click", function () {

        var filter_new = filtered_data_serv.filter(function (d) {
            return d.subRegion === "Pacific";
        });
        var enterDots = svg.selectAll("circle")
            .data(filter_new, function (d) {
                return d.state;
            });

        enterDots.enter().append("circle")
            .attr("cx", function (d) {
                return xScale(d.incomeFemale / 1000);
            })
            .attr("cy", function (d) {
                return yScale(d.incomeMale / 1000);
            })
            .attr("r", 5)
            .attr("fill", function (d) {
                return colorScale(d.subRegion);
            })
            .attr("opacity", 0.7)
            .attr("stroke", "white")
            .attr("stroke-width", 1)
            .merge(enterDots)
            .transition()
            .duration(2000) //speed
            .delay(200)
            .attr("cx", function (d) {
                return xScale(d.incomeFemale / 1000);
            })
            .attr("cy", function (d) {
                return yScale(d.incomeMale / 1000);
            })
            .attr("r", 5)
            .attr("fill", function (d) {
                return colorScale(d.subRegion);
            })
            .attr("opacity", 0.7)
            .attr("stroke", "white")
            .attr("stroke-width", 1);

        enterDots.exit()
            .transition()
            .duration(2000)
            .delay(200)
            .attr("opacity", 0);

    });

    //tooltip

    var tooltip = d3.select("#chart")
        .append("div")
        .attr("class", "tooltip");

    dots.on("mouseover", function (d) {

        console.log(d)

        var cx = +d3.select(this).attr("cx");
        var cy = +d3.select(this).attr("cy") + 200;

        tooltip.style("visibility", "visible")
            .style("left", cx + "px")
            .style("top", cy + "px")
            .text(d.state + " " + "Male:" + " " + d.incomeMale + " " + "Female:" + " " + d.incomeFemale);

    }).on("mouseout", function () {

        tooltip.style("visibility", "hidden");

    });



});