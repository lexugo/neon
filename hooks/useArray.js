import { useMemo } from 'react'

export const useMap = (collection, map, deps = []) =>
	useMemo(() => collection?.map(map), [collection, ...deps])

export const useFilter = (collection, filter, deps = []) =>
	useMemo(() => collection?.filter(filter), [collection, ...deps])

/**
 * Groups elements of a collection
 * @param collection {any[]}
 * @param by one or many properties to group elements by or grouping functions
 */
export function useGroups(collection, by) {
	return useMemo(() => groupBy(collection, grouping(by)), [collection])
}

/**
 * Groups element of a collection using a grouping function
 * @param collection {any[]}
 * @param grouping {function(any): string}
 */
function groupBy(collection, grouping) {
	return collection.reduce((groups, element) => {
		const group = grouping(element)
		groups[group] = [...(groups[group] ?? []), element]

		return groups
	}, {})
}

function grouping(filter) { // Todo: optimize and cleanup
	if (Array.isArray(filter)) {
		const filters = filter.map(grouping)
		return element => filters.map(filter => filter(element)).join('-')
	}

	return typeof filter === 'function' ? filter : element => element[filter]
}
