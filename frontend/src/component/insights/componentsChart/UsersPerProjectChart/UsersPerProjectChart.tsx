import { useMemo, type VFC } from 'react';
import 'chartjs-adapter-date-fns';
import type { InstanceInsightsSchema } from 'openapi';
import {
    LineChart,
    NotEnoughData,
} from 'component/insights/components/LineChart/LineChart';
import { useProjectChartData } from 'component/insights/hooks/useProjectChartData';
import { usePlaceholderData } from 'component/insights/hooks/usePlaceholderData';
import type { GroupedDataByProject } from 'component/insights/hooks/useGroupedProjectTrends';

interface IUsersPerProjectChartProps {
    projectFlagTrends: GroupedDataByProject<
        InstanceInsightsSchema['projectFlagTrends']
    >;
}

export const UsersPerProjectChart: VFC<IUsersPerProjectChartProps> = ({
    projectFlagTrends,
}) => {
    const placeholderData = usePlaceholderData({
        type: 'constant',
    });

    const data = useProjectChartData(projectFlagTrends);
    const notEnoughData = useMemo(
        () => (data.datasets.some((d) => d.data.length > 1) ? false : true),
        [data],
    );

    return (
        <LineChart
            data={notEnoughData ? placeholderData : data}
            overrideOptions={{
                parsing: {
                    yAxisKey: 'users',
                    xAxisKey: 'date',
                },
            }}
            cover={notEnoughData ? <NotEnoughData /> : false}
        />
    );
};
