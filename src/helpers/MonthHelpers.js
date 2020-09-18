export const mapPainToChartData = (symptoms) => {
    var chart = [];
    symptoms.map(symptom => {
        var xy = {x: symptom.month_name, y: symptom.pain_level};
        chart.push(xy);
    })
    return chart;


}
export const mapMoodToChartData = (symptoms) => {
    var chart = [];
    symptoms.map(symptom => {
        var xy = {x: symptom.month_name, y: symptom.mood_level};
        chart.push(xy);
    })
    return chart;


}

export const mapBloodToChartData = (symptoms) => {
    var chart = [];
    symptoms.map(symptom => {
        var xy = {x: symptom.month_name, y: symptom.bleeding_level};
        chart.push(xy);
    })
    return chart;


}
