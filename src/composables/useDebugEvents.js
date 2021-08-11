import { nextTick } from 'vue'

// Registers mouse events and sends messages destined to be handled by useDebugAdorners.
// This composable should be added to the onMounted() of every child component of the Form.
export async function attachDebugEvents(controlProps) {
	if (!window.__DEBUG__) {
		return
	}

	await nextTick

	let container = document.getElementById(`${controlProps.name}-container`)

	container.addEventListener('click', event => {
		event.target.dispatchEvent(new CustomEvent('controlclicked', { detail: { 'event': event, 'control': controlProps }, bubbles: true, composed: true }))
	})

	container.addEventListener('mouseover', event => {
		event.target.dispatchEvent(new CustomEvent('controlmouseover', { detail: { 'event': event, 'control': controlProps }, bubbles: true, composed: true }))
	})
}

// This composable should be added to the onBeforeUnmount() of every child component of the Form.
export function detachDebugEvents(control) {
	if (!window.__DEBUG__) {
		return
	}
}