<script lang="ts">
	import { pb } from '@db';
	import type { RecordModel } from 'pocketbase';

	let {
		record,
		thumb,
		className,
		...props
	}: { record: RecordModel; thumb?: string; className?: string } = $props();
</script>

<!-- svelte-ignore a11y-missing-attribute -->
<img
	{...props}
	class=" object-cover {className}"
	src={pb.getFileUrl(record, record.pic, { thumb })}
	alt={record.name}
/>
