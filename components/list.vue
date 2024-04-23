<script setup>
const props = defineProps(['pipeId']);

const lazyItems = ref([]);
const lazyLoading = ref(false);
const virtualScrollerStages = ref();

onMounted(async () => {
  lazyLoading.value = true;

  const data = await $fetch('/api/pipe', {
    method: 'post',
    body: { limit: 5, page: 1 },
  });

  console.log('data onmounted', data);

  if (data)
    lazyItems.value = Array.from({
      length: data.meta.total ? data.meta.total : 0,
    });
});

async function onLazyLoad(event) {
  lazyLoading.value = true;

  const { first, last } = event;
  console.log({ first, last });
  if (first === 0) virtualScrollerStages.value?.scrollToIndex(0);

  const limit = 5;
  const page = Math.ceil(first / limit) + 1;

  const { data } = await $fetch('/api/pipe', {
    method: 'post',
    body: { limit, page },
  });

  if (data) {
    const _lazyItems = [...lazyItems.value];
    console.log({ _lazyItems });

    _lazyItems.splice(first, data.data.length, ...data.data);

    lazyItems.value = _lazyItems;
    return (lazyLoading.value = false);
  }

  return (lazyLoading.value = false);
}
</script>

<template>
  <div class="content w-[100%] overflow-y-scroll max-h-[100vh]">
    <div
      class="flex items-start justify-center p-5 pt-16 bg-gray-100 min-w-screen dark:bg-surface-800"
    >
      <div class="w-full min-h-body">
        <span v-if="!lazyItems">Loading...</span>
        <VirtualScroller
          v-else
          ref="virtualScrollerStages"
          :items="lazyItems"
          :item-size="320"
          orientation="horizontal"
          :step="5"
          style="width: 100%; height: 75vh"
          :pt="{ content: 'flex flex-row gap-3' }"
          show-loader
          :loading="lazyLoading"
          lazy
          @lazy-load="onLazyLoad"
        >
          <template #item="{ item, options }">
            <Card
              :pt-options="{ mergeSections: true, mergeProps: true }"
              :pt="{
                root: { class: 'w-80 animate__animated animate__fadeInLeft' },
              }"
            >
              <template #title>
                {{ item?.name }}
              </template>
            </Card>
          </template>
        </VirtualScroller>
      </div>
    </div>
  </div>
</template>
