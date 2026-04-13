import {
  EXAMPLE_CODE,
  OUTPUT_BODY,
  OUTPUT_METHOD,
  OUTPUT_STATUS,
  highlightExample
} from './code-panel-static';
import { CodePanelClient } from './code-panel-client';

export async function CodePanel() {
  const highlightedHtml = await highlightExample();
  return (
    <CodePanelClient
      highlightedHtml={highlightedHtml}
      plainCode={EXAMPLE_CODE}
      outputMethod={OUTPUT_METHOD}
      outputStatus={OUTPUT_STATUS}
      outputBody={OUTPUT_BODY}
    />
  );
}
