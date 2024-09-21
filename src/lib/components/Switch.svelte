<script lang="ts">
    let { defaultEnabled, label, onChange } = 
    $props<{ defaultEnabled: boolean, 
             label: string, 
             onChange: (event: any) => void }>();

    let enabled = $state(defaultEnabled);

    function handleChange() {
        onChange && onChange(!enabled)
        enabled = !enabled
    }
</script>

<div class="flex items-center">
    <label class="switch-container text-primary text-sm font-medium">
        {#if label}
            <span class="label-text mr-2">{label}</span>
        {/if}
        <div class="switch">
            <input
                type="checkbox"
                checked={enabled}
                on:change={handleChange}
            >
            <span class="slider round"></span>
        </div>
    </label>
</div>

<style>
    .switch-container {
        display: flex;
        align-items: center;
        cursor: pointer;
    }

    .switch {
        position: relative;
        display: inline-block;
        width: 21px;
        height: 12px;
    }

    .switch input {
        opacity: 0;
        width: 0;
        height: 0;
    }

    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        transition: .4s;
    }

    .slider:before {
        position: absolute;
        content: "";
        height: 9px;
        width: 9px;
        left: 1px;
        bottom: 1.5px;
        background-color: white;
        transition: .4s;
    }

    input:checked + .slider {
        background-color: #2196F3;
    }

    input:focus + .slider {
        box-shadow: 0 0 1px #2196F3;
    }

    input:checked + .slider:before {
        transform: translateX(9px);
    }

    .slider.round {
        border-radius: 12px;
    }

    .slider.round:before {
        border-radius: 50%;
    }
</style>