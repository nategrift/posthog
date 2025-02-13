import { NotebookNodeType } from '~/types'
import { LemonSelectMultiple } from 'lib/lemon-ui/LemonSelectMultiple'
import { NotebooksListFilters } from 'scenes/notebooks/NotebooksTable/notebooksTableLogic'

export const fromNodeTypeToLabel: Omit<Record<NotebookNodeType, string>, NotebookNodeType.Backlink> = {
    [NotebookNodeType.FeatureFlag]: 'Feature flags',
    [NotebookNodeType.FeatureFlagCodeExample]: 'Feature flag Code Examples',
    [NotebookNodeType.Experiment]: 'Experiments',
    [NotebookNodeType.Image]: 'Images',
    [NotebookNodeType.Insight]: 'Insights',
    [NotebookNodeType.Person]: 'Persons',
    [NotebookNodeType.Query]: 'Queries',
    [NotebookNodeType.Recording]: 'Session recordings',
    [NotebookNodeType.RecordingPlaylist]: 'Session replay playlists',
    [NotebookNodeType.ReplayTimestamp]: 'Session recording comments',
}

export function ContainsTypeFilters({
    filters,
    setFilters,
}: {
    filters: NotebooksListFilters
    setFilters: (selection: Partial<NotebooksListFilters>) => void
}): JSX.Element {
    return (
        <div className="flex items-center gap-2">
            <span>Containing:</span>
            <LemonSelectMultiple
                mode="multiple"
                selectClassName={'min-w-40'}
                placeholder={'Any content'}
                options={Object.entries(fromNodeTypeToLabel)
                    .filter((entry) => entry[1] !== '')
                    .reduce((acc, [type, label]) => {
                        acc[type] = { label }
                        return acc
                    }, {})}
                value={filters.contains}
                onChange={(newValue: string[]) => {
                    setFilters({ contains: newValue.map((x) => x as NotebookNodeType) })
                }}
                data-attr={'notebooks-list-contains-filters'}
            />
        </div>
    )
}
