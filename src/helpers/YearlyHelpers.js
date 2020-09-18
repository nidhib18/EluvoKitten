export const mapPainDataToChartData = (symptoms) => {
    var chart = [];
    symptoms.map(symptom => {
        var xy = {x: symptom.Year, y: symptom.pain_level};
        chart.push(xy);
    })
    return chart;


}
export const mapMoodDataToChartData = (symptoms) => {
    var chart = [];
    symptoms.map(symptom => {
        var xy = {x: symptom.symptom.Year, y: symptom.mood_level};
        chart.push(xy);
    })
    return chart;


}

export const mapBloodDataToChartData = (symptoms) => {
    var chart = [];
    symptoms.map(symptom => {
        var xy = {x: symptom.symptom.Year, y: symptom.bleeding_level};
        chart.push(xy);
    })
    return chart;


}
