import { describe, expect, test, vi, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CategoryFormDialog } from './CategoryFormDialog';

afterEach(() => {
  cleanup();
});

describe('CategoryFormDialog', () => {
  test('在 create 模式下正确渲染标题与按钮文案，且在提交有效名称时触发 onSubmit', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    const onCancel = vi.fn();

    render(
      <CategoryFormDialog
        mode="create"
        onCancel={onCancel}
        onSubmit={onSubmit}
      />
    );

    // 验证标题和输入框标签
    expect(screen.getByRole('heading', { name: 'New category' })).toBeInTheDocument();
    const input = screen.getByRole('textbox', { name: 'Category name' });
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('');

    // 点击取消
    const cancelBtn = screen.getByRole('button', { name: 'Cancel' });
    await user.click(cancelBtn);
    expect(onCancel).toHaveBeenCalledOnce();

    // 禁用保存按钮的情况
    const createBtn = screen.getByRole('button', { name: 'Create category' });
    expect(createBtn).toBeDisabled();

    // 输入有效名称
    await user.type(input, 'Development');
    expect(createBtn).toBeEnabled();

    // 提交
    await user.click(createBtn);
    expect(onSubmit).toHaveBeenCalledWith('Development');
  });

  test('在 rename 模式下正确渲染初始值并在提交修改后触发 onSubmit', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    const onCancel = vi.fn();

    render(
      <CategoryFormDialog
        mode="rename"
        initialName="Design"
        onCancel={onCancel}
        onSubmit={onSubmit}
      />
    );

    // 验证标题和初始值
    expect(screen.getByRole('heading', { name: 'Rename category' })).toBeInTheDocument();
    const input = screen.getByRole('textbox', { name: 'Category name' });
    expect(input).toHaveValue('Design');

    // 按钮显示为 Save
    const saveBtn = screen.getByRole('button', { name: 'Save category name' });
    expect(saveBtn).toBeEnabled();

    // 清空名称验证按钮禁用
    await user.clear(input);
    expect(saveBtn).toBeDisabled();

    // 输入新名称并通过回车提交
    await user.type(input, 'Product Design');
    expect(saveBtn).toBeEnabled();
    await user.keyboard('{Enter}');
    expect(onSubmit).toHaveBeenCalledWith('Product Design');
  });
});
