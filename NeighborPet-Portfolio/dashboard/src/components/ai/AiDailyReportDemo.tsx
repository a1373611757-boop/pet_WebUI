import { useMemo, useState } from 'react';
import { AI_OUTPUT_NOTICE, type DailyReportInput } from '../../ai/aiTypes';
import { defaultDailyReportInput, dailyReportOptions } from '../../ai/aiExamples';
import { generateDailyReport } from '../../ai/mockAiEngine';
import { PromptDesignPanel } from './PromptDesignPanel';

export function AiDailyReportDemo() {
  const [input, setInput] = useState<DailyReportInput>(defaultDailyReportInput);
  const [submittedInput, setSubmittedInput] = useState<DailyReportInput>(defaultDailyReportInput);
  const output = useMemo(() => generateDailyReport(submittedInput), [submittedInput]);

  const updateInput = (key: keyof DailyReportInput, value: string) => {
    setInput((current) => ({ ...current, [key]: value }));
  };

  return (
    <section className="ai-demo-grid" aria-label="AI 寄养日报生成">
      <div className="ai-input-card">
        <div className="panel-header">
          <div>
            <p>AI 寄养日报生成</p>
            <h2>服务记录转日报草稿</h2>
          </div>
          <span className="mock-badge">商家确认</span>
        </div>

        <label className="ai-field">
          <span>宠物昵称</span>
          <input value={input.petName} onChange={(event) => updateInput('petName', event.target.value)} />
        </label>

        <div className="ai-form-row ai-form-row--two">
          {Object.entries(dailyReportOptions).map(([key, options]) => (
            <label className="ai-field" key={key}>
              <span>{fieldLabel[key as keyof typeof dailyReportOptions]}</span>
              <select value={input[key as keyof typeof dailyReportOptions]} onChange={(event) => updateInput(key as keyof DailyReportInput, event.target.value)}>
                {options.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
            </label>
          ))}
        </div>

        <label className="ai-field">
          <span>商家备注</span>
          <textarea value={input.merchantNote} onChange={(event) => updateInput('merchantNote', event.target.value)} rows={3} />
        </label>

        <button className="ai-primary-button" type="button" onClick={() => setSubmittedInput(input)}>生成日报草稿</button>
        <PromptDesignPanel feature="dailyReport" />
      </div>

      <article className="ai-result-card">
        <div className="ai-result-card__head">
          <strong>寄养日报</strong>
          <span>{AI_OUTPUT_NOTICE}</span>
        </div>
        <p className="ai-report-text">{output.report}</p>
        <div className="ai-confirm-strip">{output.confirmationNote}</div>
        <p className="ai-risk-note">{output.riskNote}</p>
      </article>
    </section>
  );
}

const fieldLabel = {
  feeding: '喂食情况',
  water: '饮水情况',
  toilet: '排便情况',
  activity: '活动情况',
  mood: '情绪状态'
};
