---
title: Integrating Apache ECharts with React & GPT-4
date: November 24, 2025
tags: "#React #AI #DataViz"
---

## The Challenge

Traditional dashboards require manual configuration for each visualization. Using GPT-4, we can generate ECharts configurations from natural language queries instead.

## Implementation

The component sends user prompts to GPT-4, which returns ECharts configurations based on the data schema.

```javascript
const ChartGenerator = ({ data }) => {
  const [config, setConfig] = useState(null);

  const generateChart = async (prompt) => {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{
        role: "system",
        content: "Generate ECharts config from user request"
      }, {
        role: "user",
        content: prompt + "\nData: " + JSON.stringify(data)
      }]
    });
    setConfig(JSON.parse(response.choices[0].message.content));
  };

  return <ReactECharts option={config} />;
};
```

## Results

Users can now create complex visualizations just by describing what they want to see. "Show me monthly revenue as a line chart" instantly generates the appropriate configuration.
