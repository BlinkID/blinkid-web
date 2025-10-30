/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

import { createListCollection, Select } from "@ark-ui/solid/select";
import { SmartEnvironmentProvider } from "@microblink/shared-components/SmartEnvironmentProvider";

import { eventFixer } from "@microblink/shared-components/eventFixer";
import { Component, Index } from "solid-js";
import IconCamera from "./assets/camera.svg?component-solid";
import IconCheck from "./assets/check.svg?component-solid";
import IconChevronDown from "./assets/general-c-chevron-down.svg?component-solid";
import { useCameraUiStore } from "./CameraUiStoreContext";
import { useLocalization } from "./LocalizationContext";

/**
 * The CameraSelector component.
 */
export const CameraSelector: Component = () => {
  const { cameraManagerSolidStore, cameraManager } = useCameraUiStore();
  const { t } = useLocalization();

  const cameras = cameraManagerSolidStore((x) => x.cameras);
  const selectedCamera = cameraManagerSolidStore((x) => x.selectedCamera);
  const facingFilter = cameraManagerSolidStore((x) => x.facingFilter);
  const isQueryingCameras = cameraManagerSolidStore((x) => x.isQueryingCameras);
  const isSwappingCamera = cameraManagerSolidStore((x) => x.isSwappingCamera);

  const isDisabled = () => isQueryingCameras() || isSwappingCamera();

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

  const selectCameraById = async (id: string) => {
    const camera = cameras().find(
      (camera) => camera.deviceInfo.deviceId === id,
    );

    if (!camera) {
      console.warn("No camera");
      return;
    }

    await cameraManager.selectCamera(camera);
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
                    class={`flex px-4 py-2 items-center gap-2 rounded-full
                    bg-gray-550/90 backdrop-blur-xl whitespace-nowrap text-base
                    color-white font-500 cursor-pointer appearance-none
                    border-none disabled:opacity-50 disabled:cursor-not-allowed
                    max-w-[100%] btn-focus`}
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
                    <Select.Indicator
                      class="shrink-0 data-[state=open]:scale-y-[-1]"
                    >
                      <IconChevronDown class="size-6 shrink-0" />
                    </Select.Indicator>
                  </button>
                );
              }}
            />
            {/* Dropdown */}
            <Select.Positioner class="focus-visible:outline-none">
              <Select.Content class="focus-visible:outline-none outline-none">
                <Select.ItemGroup
                  class="rounded-4 overflow-hidden text-base color-white
                    focus-visible:outline-none flex flex-col gap-[1px]"
                >
                  <Index each={cameraCollection().items}>
                    {(camera, index) => {
                      const isFirst = index === 0;
                      const isLast =
                        index === cameraCollection().items.length - 1;

                      return (
                        <Select.Item
                          item={camera()}
                          class={`flex py-3 pl-4 pr-12 cursor-pointer
                          select-none bg-gray-550/50 backdrop-blur-xl
                          focus-visible:outline-none outline-none border-2
                          border-solid border-transparent
                          data-[highlighted]:border-primary relative
                          ${isFirst ? "rounded-t-6" : ""}
                          ${isLast ? "rounded-b-6" : ""}`}
                        >
                          <Select.ItemText class="truncate">
                            {camera().label}
                          </Select.ItemText>
                          <Select.ItemIndicator class="absolute right-4">
                            <IconCheck class="size-6 shrink-0" />
                          </Select.ItemIndicator>
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
