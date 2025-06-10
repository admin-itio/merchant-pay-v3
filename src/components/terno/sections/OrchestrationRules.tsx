
import React from 'react';
import OrchestrationOverview from './components/OrchestrationOverview';
import DefaultRoutingStrategy from './components/DefaultRoutingStrategy';
import CustomOrchestrationRules from './components/CustomOrchestrationRules';
import ProcessorConfiguration from './components/ProcessorConfiguration';
import OrchestrationBestPractices from './components/OrchestrationBestPractices';

interface OrchestrationRulesProps {
  data: any;
  onChange: (data: any) => void;
}

const OrchestrationRules = ({ data, onChange }: OrchestrationRulesProps) => {
  return (
    <div className="space-y-6">
      <OrchestrationOverview data={data} onChange={onChange} />
      <DefaultRoutingStrategy data={data} onChange={onChange} />
      <CustomOrchestrationRules data={data} onChange={onChange} />
      <ProcessorConfiguration />
      <OrchestrationBestPractices />
    </div>
  );
};

export default OrchestrationRules;
