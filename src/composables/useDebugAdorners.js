import { ref, watch } from 'vue'

// Listens for mouse events and shows a color overlay on the focused control.
// This composable should be added to the onMounted() of the Form.
export default function useDebugAdorners() {
	// Watch the currently focused control
	const _selectedControl = ref()
	watch(_selectedControl, (newValue, oldValue) => {
		console.log('The new _selectedControl value is: ' + _selectedControl.value.name)

		// Remove class on the old
		if (oldValue?.name) {
			document.getElementById(`${oldValue.name}-container`).classList.remove('debug-selected')
		}

		// Add class on the new
		if (newValue?.name) {
			document.getElementById(`${newValue.name}-container`).classList.add('debug-selected')
		}
		
		// Notify WebView
		if (window.chrome?.webview != undefined) {
			let message = {
				message: 'control-selected',
				payload: newValue
			}
			window.chrome.webview.postMessage(JSON.stringify(message))
		}
	})
	
	// Bind event listeners
	window.addEventListener('controlclicked', onControlClicked)
	window.addEventListener('controlmouseover', onControlMouseover)

	function onControlClicked(ev) {
		if (_selectedControl?.value == ev.detail.control)
			return

		_selectedControl.value = ev.detail.control
	}

	function onControlMouseover(ev) {
		if (_selectedControl?.value == ev.detail.control)
			return

		_selectedControl.value = ev.detail.control
	}
}