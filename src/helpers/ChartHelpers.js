export const mapPainDataToChartData = (symptoms) => {
    var chart = [];
    symptoms.map(symptom => {
        var xy = {x: symptom.day_of_week, y: symptom.pain_level};
        chart.push(xy);
    })
    return chart;


}
export const mapMoodDataToChartData = (symptoms) => {
    var chart = [];
    symptoms.map(symptom => {
        var xy = {x: symptom.day_of_week, y: symptom.mood_level};
        chart.push(xy);
    })
    return chart;


}

export const mapBloodDataToChartData = (symptoms) => {
    var chart = [];
    symptoms.map(symptom => {
        var xy = {x: symptom.day_of_week, y: symptom.bleeding_level};
        chart.push(xy);
    })
    return chart;


}