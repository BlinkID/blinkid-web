/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

import { createListCollection, Select } from "@ark-ui/solid/select";
import { SmartEnvironmentProvider } from "@microblink/shared-components/SmartEnvironmentProvider";

import { Component, createSignal, Index, Show } from "solid-js";
import { eventFixer } from "@microblink/shared-components/eventFixer";
import IconCamera from "./assets/camera.svg?component-solid";
import IconCheck from "./assets/check.svg?component-solid";
import IconChevronDown from "./assets/general-c-chevron-down.svg?component-solid";
import { useCameraUiStore } from "./CameraUiStoreContext";
import { useLocalization } from "./LocalizationContext";

/**
 * A camera option.
 */
type CameraOption = {
  value: string;
  label: string;
};

/**
 * The CameraSelector component.
 */
export const CameraSelector: Component = () => {
  const { cameraManagerSolidStore, cameraManager } = useCameraUiStore();
  const { t } = useLocalization();

  const cameras = cameraManagerSolidStore((x) => x.cameras);
  const selectedCamera = cameraManagerSolidStore((x) => x.selectedCamera);
  const isQueryingCameras = cameraManagerSolidStore((x) => x.isQueryingCameras);
  const facingFilter = cameraManagerSolidStore((x) => x.facingFilter);

  const [isSwapping, setIsSwapping] = createSignal(false);

  const isDisabled = () => isQueryingCameras() || isSwapping();

  const camerasWithFacingFilter = () => {
    const $facingFilter = facingFilter();
    if (!$facingFilter) {
      return cameras();
    }

    return cameras().filter((camera) =>
      $facingFilter.includes(camera.facingMode),
    );
  };

  const createCameraOptions = () => [
    ...camerasWithFacingFilter().map((camera) => ({
      value: camera.deviceInfo.deviceId,
      label: camera.name,
    })),
  ];

  const cameraCollection = () =>
    createListCollection({
      items: [...createCameraOptions()],
    });

  const selectedCameraInCollection = () => {
    const $selectedCamera = selectedCamera();
    if (!$selectedCamera) {
      return;
    }

    const foundCamera = cameraCollection().find(
      $selectedCamera.deviceInfo.deviceId,
    );

    if (!foundCamera) {
      return;
    }

    return [foundCamera.value];
  };

  const isFakeCamera = (value: string) => {
    return fakeCameras.some((fakeCamera) => fakeCamera.value === value);
  };

  const selectCameraById = async (id: string) => {
    setIsSwapping(true);
    const camera = cameras().find(
      (camera) => camera.deviceInfo.deviceId === id,
    );

    if (!camera) {
      console.warn("No camera");
      return;
    }

    await cameraManager.selectCamera(camera);
    setIsSwapping(false);
  };

  return (
    <SmartEnvironmentProvider>
      {() => (
        <>
          <Select.Root
            part="camera-select-part"
            collection={cameraCollection()}
            value={selectedCameraInCollection()}
            positioning={{
              placement: "top",
            }}
            lazyMount={true}
            disabled={isDisabled()}
            onValueChange={(details) => {
              if (isFakeCamera(details.value[0])) {
                console.warn("Fake camera, skipping");
                return;
              }
              void selectCameraById(details.value[0]);
            }}
          >
            <Select.Label class="sr-only">{t.selected_camera}</Select.Label>
            {/* Trigger */}
            <Select.Trigger
              asChild={(selectProps) => {
                return (
                  <button
                    {...eventFixer(selectProps())}
                    // Unterminated string literal if using regular multiline quotes
                    class={`flex px-4 py-2 items-center gap-2 rounded-full bg-dark-100/50 backdrop-blur-xl
                    whitespace-nowrap text-base color-white font-500 cursor-pointer appearance-none
                    border-none disabled:opacity-50 disabled:cursor-not-allowed max-w-[100%]`}
                  >
                    <IconCamera class="size-6 shrink-0" aria-hidden />
                    <Select.ValueText
                      class="truncate"
                      placeholder={
                        isQueryingCameras()
                          ? t.loading_cameras
                          : t.select_a_camera
                      }
                    />
                    <Select.Indicator class="shrink-0 data-[state=open]:scale-y-[-1]">
                      <IconChevronDown class="size-6 shrink-0" />
                    </Select.Indicator>
                  </button>
                );
              }}
            />
            {/* Dropdown */}
            <Select.Positioner>
              <Select.Content>
                <Select.ItemGroup class="rounded-4 overflow-hidden text-base color-white">
                  <Index each={cameraCollection().items}>
                    {(camera, index) => {
                      return (
                        <Select.Item
                          item={camera()}
                          class="flex py-3 pl-4 pr-12 cursor-pointer select-none relative gap-[1px]
                            bg-dark-100/50 backdrop-blur-xl data-[highlighted]:bg-gray-500/50"
                        >
                          <Select.ItemText class="truncate">
                            {camera().label}
                          </Select.ItemText>
                          <Select.ItemIndicator class="absolute right-4">
                            <IconCheck class="size-6 shrink-0" />
                          </Select.ItemIndicator>
                          {/* separator */}
                          <Show when={index !== 0}>
                            <div class="h-[1px] absolute left-0 right-0 top-[-1px] bg-white pointer-events-none" />
                          </Show>
                        </Select.Item>
                      );
                    }}
                  </Index>
                </Select.ItemGroup>
              </Select.Content>
            </Select.Positioner>
          </Select.Root>
        </>
      )}
    </SmartEnvironmentProvider>
  );
};

/**
 * The fake cameras.
 */
const fakeCameras: CameraOption[] = [
  {
    value: "5",
    label: "Back Camera 2",
  },
  {
    value: "2",
    label: "Back Triple Camera",
  },
  {
    value: "1",
    label: "Back Dual Wide Camera",
  },
  {
    value: "3",
    label: "Front Camera 5",
  },
  {
    value: "4",
    label: "Some random desktop camera",
  },
];
