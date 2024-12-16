class changeSelectedState {
	changeSelectedState(selectedState, id, time) {
		selectedState[id][time] = !selectedState[id][time]
	}
}
export default new changeSelectedState()